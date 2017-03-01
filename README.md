# Splunk Tester

Performing a cluster upgrade?
Writing a complicated SPL?

Maybe you need some automated test cases!

## Dependancies

Mocha, recommend installing globally
> $ npm install -g mocha

## Install
Pull
> $ git pull git@github.com:pwmcintyre/splunk-tester.git

Install
> $ npm install

## Configure

Update your config accordingly here:
> $ vi ./config/development.json

See detailed [config](https://www.npmjs.com/package/config) documentation.

## Run a local Splunk instance (optional)

I've used [this docker splunk](https://hub.docker.com/r/johnsandiford/splunk) container for testing. I recommended it for small tests.

## Run

Run all test cases
> $ mocha

Example output (if you haven't changed any test cases)

    $ mocha    
    
      Basic searching
        ✓ should return 1 result quickly (367ms)
    
      1 passing (377ms)

## Write More Test Cases
Add as many test cases as you need in the test folder.
> $ ls ./tests/test-*.js

See detailed [mocha](https://www.npmjs.com/package/mocha) documentation.
