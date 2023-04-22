const obj = {
  name: 'root',
  children: [
    {
      name: '1',
      children: [
        {
          name: '1-1',
          children: [],
        },
        {
          name: '1-2',
          children: [],
        },
      ],
    },
    {
      name: '2',
      children: [
        {
          name: '2-1',
          children: [
            {
              name: '2-1-1',
            },
            {
              name: '2-1-2',
            },
          ],
        },
        {
          name: '2-2',
          children: [],
        },
      ],
    },
  ],
}

const traverseDFS = (obj) => {
  if (obj) {
    console.log(obj.name)

    if (obj.children) {
      for (const child of obj.children) {
        traverseDFS(child)
      }
    }
  }
}

console.log('-------DFS--------')
traverseDFS(obj)

const traverseBFS = (obj) => {
  if (!obj) {
    return
  }

  const res = []
  const queue = [obj]
  while (queue.length) {
    const current = queue.shift()
    res.push(current.name)
    if (Array.isArray(current.children)) {
      queue.push(...current.children)
    }
  }

  for (const node of res) {
    console.log(node)
  }
}

console.log('-------BFS--------')
traverseBFS(obj)
