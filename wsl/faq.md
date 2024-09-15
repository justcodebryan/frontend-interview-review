# Frontend Project cannot HMR

export CHOKIDAR_USEPOLLING=true

# Frontend Project HMR slow

sudo sysctl -w fs.inotify.max_user_watches=524288  

# Cannot use http proxy 

On wsl2 distribution, modify the `.wslconfig`. 

Step 1. Update the wsl version to latest version.

```powershell

wsl --update

```

Step 2. Add the following settings on the file.

```wslconfig

[wsl2]

[experimental]
sparseVhd=true
networkingMode=mirrored
firewall=true
dnsTunneling=true
autoProxy=true

```

Step 3. Reload the wsl by shutdown all distribution.
```powershell

wsl --shutdown

```

Step 4. Waiting for over 8 seconds and restart the wsl.



# WSL1 proxy config
```bash
function setproxy {
  local proxy_protocol='http'
  local proxy_host='127.0.0.1'
  local proxy_port='15236'

  export all_proxy="$proxy_protocol://$proxy_host:$proxy_port"
  git config --global http.proxy "$proxy_protocol://$proxy_host:$proxy_port"
  git config --global https.proxy "$proxy_protocol://$proxy_host:$proxy_port"
  git config --global core.gitproxy "$proxy_protocol://$proxy_host:$proxy_port"

  echo "[info]: proxy set successfully to $proxy_protocol://$proxy_host:$proxy_port."
}

function unsetproxy {
  # unset env proxy variables
  unset all_proxy
  unset http_proxy
  unset https_proxy

  # unset git proxy
  git config --global --unset http.proxy
  git config --global --unset https.proxy
  git config --global --unset core.gitproxy

  echo "[info]: proxy unset."
}
```
