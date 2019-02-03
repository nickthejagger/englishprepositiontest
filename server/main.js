import { Meteor } from 'meteor/meteor';
import '../imports/api/api.js'
function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
});
