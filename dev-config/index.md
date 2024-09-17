# WSL
## Apt Source Replace
[Tsinghua Source](https://mirror.tuna.tsinghua.edu.cn/)

[Tsinghua Debian Apt Source](https://mirror.tuna.tsinghua.edu.cn/help/debian/) 

[Tsinghua Ubuntu Apt Source](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)

```bash
# Step 1. Go to apt sources list folder
cd /etc/apt

# Step 2. Backup the original source.list file
sudo cp sources.list sources.list.yyyyMMdd.bak

# Step 3. Vi the sources.list file and replace the whole file content
sudo vi sources.list

# Step 4. After saving the file, run apt update and upgrade command
# Update apt index
sudo apt update

sudo apt upgrade
```

## Install Essential Packages Via Apt
```bash
# Install Git
sudo apt install git

# Install Curl & Wget
sudo apt install curl wget

# Install C complier
sudo apt install ninja-build gettext cmake unzip curl build-essential

# Install Java Environment
sudo apt install default-jdk

# Install Maven & Gradle
sudo apt install maven gradle
```

## Git Config

- Git Local Global Config

```bash
# Config Git User Email & User Name
# source: https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration
git config --global user.email "youremail@example.com"
git config --global user.name "yourname"

# Config Git Editor
git config --global core.editor vim

# Config Git Aliases
# source: https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

- Add Git SSH Key

[Connecting To Github With SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

1. Enter `ls -al ~/.ssh` to see if existing SSH keys are present.

```sh
ls -al ~/.ssh
# Lists the files in your .ssh directory, if they exist
```

2. Paste the text below, replacing the email used in the example with your GitHub email address.

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. Start the ssh-agent in the background.

```sh
eval "$(ssh-agent -s)"
```

4. Add your SSH private key to the ssh-agent.

If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

```sh
ssh-add ~/.ssh/id_ed25519
```

5. Copy the SSH public key to your clipboard.

If your SSH public key file has a different name than the example code, modify the filename to match your current setup. When copying your key, don't add any newlines or whitespace.

```sh
cat ~/.ssh/id_ed25519.pub
# Then select and copy the contents of the id_ed25519.pub file
# displayed in the terminal to your clipboard
```

6. Add to Github

- In the upper-right corner of any page on GitHub, click your profile photo, then click  Settings.

- In the "Access" section of the sidebar, click  SSH and GPG keys.

- Click New SSH key or Add SSH key.

- In the "Title" field, add a descriptive label for the new key. For example, if you're using a personal laptop, you might call this key "Personal laptop".

7. Test the SSH key
```sh
ssh -T git@github.com
```

## Install Oh My Zsh
```bash
# use curl to download and run
sh -c "$(curl -fsSL https://install.ohmyz.sh/)"

# use wget to download and run
sh -c "$(wget -O- https://install.ohmyz.sh/)"
```

## Zsh/Bash Profile Alias & Proxy
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

## Oh-My-Zsh Plugins

- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

```zshrc
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)
```

## Install Nvm & Node

1. Install Nvm

[NVM Github Repository](https://github.com/nvm-sh/nvm)

- Github Source

To **install** or **update** nvm, you should run the [install script][2]. To do that, you may either download and run the script manually, or use the following cURL or Wget command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
- China Mainland Gitee Source
```bash
# China Mainland
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash
```
- Git Install

If you have `git` installed (requires git v1.7.10+):

1. clone this repo in the root of your user profile
    - `cd ~/` from anywhere then `git clone https://github.com/nvm-sh/nvm.git .nvm`
2. `cd ~/.nvm` and check out the latest version with `git checkout v0.40.1`
3. activate `nvm` by sourcing it from your shell: `. ./nvm.sh`

Now add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file to have it automatically sourced upon login:
(you may have to add to more than one of the above files)

```sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

2. Config Nvm Mirrors And Download The Nodejs
```bash
export NVM_SOURCE=https://gitee.com/mirrors/nvm.git

nvm node_mirror https://npmmirror.com/mirrors/node
nvm node_mirror https://npmmirror.com/mirrors/npm
```

3. Install Nodejs Via Nvm
```bash
# Install Latest Version
nvm install --lts

# Install Node18
nvm install 18

# Install Node16
nvm install 16

# Install Node14
nvm install 14

# Use Node18 As Default Version
nvm alias default 18
```

4. Config Npm Mirror
```bash
npm config set registry https://registry.npmmirror.com
```

5. Install Essential Nodejs Global Packages
```bash
# Install Essential Nodejs Global Packages
npm install -g yarn pnpm eslint prettier ts-node typescript

# Config Yarn Mirror 
yarn config set registry https://registry.npmmirror.com
```

# Windows
## PowerShell Alias & Proxy

```pwsh
# Custom Aliases Start

# Alias: setproxy
# Usage: Set proxy config function
function Set-Proxy {
  $env:HTTP_PROXY="http://127.0.0.1:15236"
  $env:HTTPS_PROXY="http://127.0.0.1:15236"
}

Set-Alias -Name setproxy -Value Set-Proxy

# Alias: unsetproxy
# Usage: Unset proxy config function
function Unset-Proxy {
  $env:HTTP_PROXY=$null
  $env:HTTPS_PROXY=$null
}

Set-Alias -Name unsetproxy -Value Unset-Proxy

# Alias: env
# Usage: Get environment variables and print on console
function Get-EnvVariables {
  Get-ChildItem env:
}
Set-Alias -Name env -Value Get-EnvVariables

# Custom Aliases End

# Custom Settings Start

# Setting: UI Language
# Usage: Set UI Language to English
[cultureinfo]::CurrentUICulture = 'en-US'

# Custom Settings End
```

## Install Scoop

[Scoop](https://scoop.sh/)

1. Install Script

```pwsh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

2. Install Essential Packages

- Install Basic Command Packages

```pwsh
scoop install sudo
sudo scoop install 7zip git openssh --global
scoop install aria2 curl grep sed less touch
scoop install python ruby go perl
```

- Install `Aria2` To Boost Downloads By Using Multi-connection

Scoop can utilize `aria2` to use multi-connection downloads. Simply install aria2 through Scoop and it will be used for all downloads afterward.

```pwsh
scoop install aria2
```
By default, scoop displays a warning when running scoop install or scoop update while aria2 is enabled. This warning can be suppressed by running `scoop config aria2-warning-enabled false`.


- How To Change The Scoop Repo

Check Avaliable Scoop Repo

```pwsh
# Check Known Bucket
scoop bucket known

# Add Need Bucket
scoop bucket add extras
```

Use Gitee Mirror When Meeting Network Error.
```pwsh
# Troubleshooting
# source: https://gitee.com/scoop-installer
# Main Repo Example
scoop bucket add main https://gitee.com/scoop-installer/Main
scoop update
```

Reset The Scoop Repo
```pwsh
scoop config SCOOP_REPO https://github.com/ScoopInstaller/Scoop
scoop update
```

- Install Development Tools

```pwsh
# Install Vim
scoop install vim

# Install Neovim
scoop install neovim

# Install PowerShell7
scoop install pwsh

# Install Python3
scoop install python

# Add Extras Bucket To Scoop
scoop bucket add extras

# Install PowerToys And Everything
scoop install powertoys everything
# Install Everything-PowerToys Plugin
scoop install everything-powertoys

# Add Nerd-Fonts Bucket To Scoop
scoop bucket add nerd-fonts
# Install Cascadia-Code Font
scoop install Cascadia-Code
```

- Install Nvm

```pwsh
# Install Nvm Via Scoop
scoop install nvm

# Install Latest Node
nvm install latest
# Install Node18
nvm install 18
# Use Node18
nvm use 18
# Set Npm Mirror
npm config set registry https://registry.npmmirror.com

# Install Essential Nodejs Global Packages
npm install -g ts-node typescript eslint prettier yarn pnpm

# Set Yarn Mirror
yarn config set registry https://registry.npmmirror.com
```

- Install Java

```pwsh
# Add Java Bucket To Scoop
scoop bucket add java

# Install The Latest OpenJDK
scoop install oraclejdk
# Install The Latest OpenJDK8
scoop install openjdk8-redhat

# Use OpenJDK8 As Default Java
scoop reset openjdk8-redhat

# Install Maven & Gradle
scoop install maven gradle
```