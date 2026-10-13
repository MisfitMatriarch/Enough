// Staff-only local utility. Credentials stay in environment variables, never browser code.
import { getStore } from '@netlify/blobs';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
if (!process.env.NETLIFY_SITE_ID || !process.env.NETLIFY_AUTH_TOKEN) throw new Error('Set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in your private local environment.');
const store = getStore({ name:'expo-reservations-production', siteID:process.env.NETLIFY_SITE_ID, token:process.env.NETLIFY_AUTH_TOKEN, consistency:'strong' });
const consentStore = getStore({ name:'expo-consents-production', siteID:process.env.NETLIFY_SITE_ID, token:process.env.NETLIFY_AUTH_TOKEN, consistency:'strong' });
const cell = value => {
  let text = String(value ?? '');
  // Prevent spreadsheet formula execution, including after leading whitespace.
  if (/^\s*[=+@\-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
  return '"' + text.replace(/"/g,'""') + '"';
};
const rows = [['reservation_id','name','email','title_ids','created_at','status','source','marketing_opt_in','consent_version']];
for await (const page of store.list({ prefix:'reservation/', paginate:true })) {
  for (const item of page.blobs) {
    const record = await store.get(item.key,{type:'json'});
    if (!record) continue;
    const consent = await consentStore.get(`consent/${record.id}`,{type:'json'});
    rows.push([record.id,record.name,record.email,record.titleIds.join(';'),record.createdAt,record.status,record.source,consent?.optedIn ?? '',consent?.version ?? '']);
  }
}
const path = resolve(process.argv[2] || 'private-exports/expo-reservations.csv');
mkdirSync(resolve(path,'..'),{recursive:true});
writeFileSync(path,rows.map(row => row.map(cell).join(',')).join('\r\n')+'\r\n',{mode:0o600});
console.log(`Exported ${rows.length-1} reservations. Store this private file securely.`);
