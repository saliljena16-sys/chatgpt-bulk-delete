const test = require('node:test');
const assert = require('node:assert/strict');
require('../core.js');
const {getToken, listPage, deleteChat} = globalThis.BulkChatCore;
const response = (data, ok = true, status = 200) => ({ok, status, json: async () => data});

test('gets a session token without saving it', async () => {
  let options;
  const token = await getToken(async (path, opts) => {assert.equal(path, '/api/auth/session'); options = opts; return response({accessToken:'test-token'});});
  assert.equal(token, 'test-token'); assert.equal(options.credentials, 'same-origin');
});
test('rejects missing credentials and unauthorized requests', async () => {
  await assert.rejects(getToken(async () => response({})), /session/);
  await assert.rejects(getToken(async () => response({}, false, 401)), /sign in/);
});
test('loads titles safely and rejects malformed responses', async () => {
  let url;
  const fetcher = async (path) => {url = path; return response({items:[{id:'chat-1',title:'A'}, {id:'chat-2',title:''}]});};
  assert.deepEqual(await listPage(fetcher, 'test-token', 100), [{id:'chat-1',title:'A',updated:''},{id:'chat-2',title:'Untitled chat',updated:''}]);
  assert.match(url, /offset=100/);
  await assert.rejects(listPage(async()=>response({items:[{id:'../bad'}]}), 'test-token', 0), /invalid chat ID/);
  await assert.rejects(listPage(async()=>response({}), 'test-token', 0), /unexpected chat list/);
});
test('sends only the requested ID and requires confirmation of deletion', async () => {
  let request;
  await deleteChat(async (url, opts) => {request = {url,opts}; return response({success:true});}, 'test-token', 'chat-1');
  assert.equal(request.url,'/backend-api/conversation/chat-1'); assert.equal(request.opts.method,'PATCH');
  assert.deepEqual(JSON.parse(request.opts.body),{is_visible:false});
  await assert.rejects(deleteChat(async()=>response({success:false}), 'test-token','chat-2'), /did not confirm/);
  await assert.rejects(deleteChat(async()=>response({},false,500), 'test-token','chat-2'), /500/);
  await assert.rejects(deleteChat(async()=>{throw new Error('should not be called');}, 'test-token','../bad'), /Invalid chat ID/);
});
