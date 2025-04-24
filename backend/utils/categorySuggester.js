const nlp = require('compromise');

const suggestCategory = (title) => {
  const doc = nlp(title.toLowerCase());
if (doc.has('email') || doc.has('inbox') || doc.has('reply')) return 'Communicaton';
if (doc.has('buy') || doc.has('groceries') || doc.has('shop')) return 'Personal';
  if (doc.has('call') || doc.has('meet') || doc.has('zoom')) return 'Meetings';
  if (doc.has('code') || doc.has('debug') || doc.has('deploy')) return 'Development';
  if (doc.has('assignment') || doc.has('project') || doc.has('paper')) return 'Study';

  return 'General';
};

module.exports = suggestCategory;

