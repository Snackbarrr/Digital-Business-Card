const client = sanityClient({
  projectId: 'poq3Nu02f', // <<-- Replace this!
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
});

client.fetch(`*[_type == "post"] | order(_createdAt desc){
  _id,
  title,
  body
}`).then(posts => {
  const container = document.getElementById('journal');
  container.innerHTML = ""; // Clear "Loading entries..." text
  posts.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    container.appendChild(article);
  });
}).catch(err => {
  console.error('Fetch error:', err);
  document.getElementById('journal').innerText = 'Failed to load entries.';
});
