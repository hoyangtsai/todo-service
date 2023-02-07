db.createUser({
  user: 'admin#96',
  pwd: 'ys@nEighTo',
  roles: [
    {
      role: 'root',
      db: 'todo-db',
    },
  ],
});