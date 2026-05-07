const lucide = require('lucide-react');
console.log('Phone exists:', !!lucide.Phone);
console.log('Smartphone exists:', !!lucide.Smartphone);
console.log('All keys:', Object.keys(lucide).filter(k => k.toLowerCase().includes('phone')));
