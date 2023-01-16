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

[![asciicast](https://asciinema.org/a/pSWq95qMX0maWcPQgUugkvlAy.svg)](https://asciinema.org/a/pSWq95qMX0maWcPQgUugkvlAy)

**YAML**
```bash
gendiff file1.yml file2.yml
gendiff --format stylish file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/FydBl5LbIUwwZIeR3t8Aqhyrf.svg)](https://asciinema.org/a/FydBl5LbIUwwZIeR3t8Aqhyrf)

### Plain format
**JSON**
```bash
gendiff --format plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/BaZAnkBmfZSHX50G3dpWJWlIO.svg)](https://asciinema.org/a/BaZAnkBmfZSHX50G3dpWJWlIO)

**YAML**
```bash
gendiff --format plain file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/NpqevmvhHsikOJLcl2nYC9i3t.svg)](https://asciinema.org/a/NpqevmvhHsikOJLcl2nYC9i3t)

### JSON format
**JSON**
```bash
gendiff --format json file1.json file2.json
```
[![asciicast](https://asciinema.org/a/I1qIQ20zsV3gI8nI7AxITXvl5.svg)](https://asciinema.org/a/I1qIQ20zsV3gI8nI7AxITXvl5)

**YAML**
```bash
gendiff --format json file1.yml file2.yml
```
[![asciicast](https://asciinema.org/a/D1jWtBye7RB9WPwQSzJ2kPTfp.svg)](https://asciinema.org/a/D1jWtBye7RB9WPwQSzJ2kPTfp)