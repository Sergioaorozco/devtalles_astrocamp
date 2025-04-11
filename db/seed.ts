import { db, Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(Clients).values([
		{ id: 1, isActive: true, name: 'John Doe' },
		{ id: 2, isActive: false, name: 'Jane Smith' },
		{ id: 3, isActive: true, name: 'Alice Johnson' },
		{ id: 4, isActive: false, name: 'Bob Brown' },
		{ id: 5, isActive: true, name: 'Charlie Davis' },
	])
}
