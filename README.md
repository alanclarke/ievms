# ievms-cli
Simple command line api wrapper for xdissent/ievms

## motivation
Makes the excellent https://github.com/xdissent/ievms project a bit easier to consume with a local help menu and simple command line options api

## installation
```
npm install -g ievms
```

## usage
```
ievms --help

Usage: ievms [options]

Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -v, --versions [versions]  add a version of IE to be installed (see https://github.com/xdissent/ievms for a full list)
  -p, --path [path]          specify the install path
  -c, --curl-option [curl]   specify curl options, e.g. --limit-rate 50k
  -d, --dry [dry]            log installation command and exit
```
```
ievms -v 8 -v 9 --dry
curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="8 9" bash
```
```
ievms --path /myusb/ievms --dry
curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env INSTALL_PATH="/myusb/ievms" bash
```
```
ievms -v 10
curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="10" bash
Checking for VirtualBox
Checking for Oracle VM VirtualBox Extension Pack
Pack no. 0:   Oracle VM VirtualBox Extension Pack
Building IE 10 VM
...
```
