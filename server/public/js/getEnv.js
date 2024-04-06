const envs = document.querySelectorAll('[id^="env-"]')

function getEnv(id) {
  return fetch(`/api/env/${id}`).then(res => res.text())
}