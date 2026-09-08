const API = import.meta.env.WP_API_URL;

export async function getProjects() {
  const response = await fetch(
    `${API}/projects?_embed&per_page=100&acf_format=standard`
    );

  if (!response.ok) {
    throw new Error('Failed to fetch WordPress projects');
  }

  return response.json();
}