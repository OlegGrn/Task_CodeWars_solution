"use strict";

function addUsername(list) {

	let now = new Date();

	return list.map(user => {
		let username = user.firstName.toLowerCase()
			+ user.lastName[0].toLowerCase()
			+ (now.getFullYear() - user.age);
		user.username = username;
		return user
	})

}





let list1 = [
	{ firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby' },
	{ firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure' }
];


let solution = [
	{
		firstName: 'Emily', lastName: 'N.', country: 'Ireland', continent: 'Europe', age: 30, language: 'Ruby',
		username: 'emilyn1990'
	},
	{
		firstName: 'Nor', lastName: 'E.', country: 'Malaysia', continent: 'Asia', age: 20, language: 'Clojure',
		username: 'nore2000'
	}
]

console.log(addUsername(list1));

/*
[1, 3, 5, 7]
a, b, c, d, e
1, 2, 3, 4, 5
f, g, h, i, j


b, d
2, 4
g, i

1
2
3
4
5
*/