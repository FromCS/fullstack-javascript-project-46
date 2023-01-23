### Hexlet tests and linter status:
[![Actions Status](https://github.com/FromCS/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/FromCS/fullstack-javascript-project-46/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/a2f9bc2d9f3a8dd3621a/maintainability)](https://codeclimate.com/github/FromCS/fullstack-javascript-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a2f9bc2d9f3a8dd3621a/test_coverage)](https://codeclimate.com/github/FromCS/fullstack-javascript-project-46/test_coverage)

## Installation
```bash
git clone git@github.com:FromCS/fullstack-javascript-project-46.git
make install
```  
## Requirements
NodeJS above v.16

## Description
Gendiff is the CLI application. This app using for compare two files.
Available file's extension are *.json* and *.yaml*.
Available formatters are *stylish*, *plain* & *json*.

## Formatters
### Default OR stylish
**JSON**
```bash
gendiff file1.json file2.json
gendiff --format stylish file1.json file2.json
```

[![asciicast](https://asciinema.org/a/553621.svg)](https://asciinema.org/a/553621)

**YAML**
```bash
gendiff file1.yml file2.yml
gendiff --format stylish file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/553622.svg)](https://asciinema.org/a/553622)

### Plain format
**JSON**
```bash
gendiff --format plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/553623.svg)](https://asciinema.org/a/553623)

**YAML**
```bash
gendiff --format plain file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/553624.svg)](https://asciinema.org/a/553624)

### JSON format
**JSON**
```bash
gendiff --format json file1.json file2.json
```
[![asciicast](https://asciinema.org/a/553625.svg)](https://asciinema.org/a/553625)

**YAML**
```bash
gendiff --format json file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/553626.svg)](https://asciinema.org/a/553626)