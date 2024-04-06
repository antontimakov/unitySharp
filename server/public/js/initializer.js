async function Start() {
  const title = await getEnv('title')
  if (title) document.title = title

  const b_path = await getEnv('build_path')
  const b_name = await getEnv('build_name')
  const streamingAssetsUrl = await getEnv('streaming_assets_url')

  swapElementAttrsIfIDHasEnv()
  loadUnity(b_name, b_path, streamingAssetsUrl)
}

Start()