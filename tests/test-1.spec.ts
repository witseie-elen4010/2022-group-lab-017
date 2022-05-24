import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://demo.playwright.dev/todomvc/#/
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('As a player I want six guessing attempts to have fair winning chances');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('As a player i want delete a letter so that i can modify the word');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('As a player i want to type 5-letter word so that i can build a word');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('I want to see correctly positioned letters in green to assist the next guess');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('I want to see the misplaced correct letters, in yellow to assist the next guess');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('I want to see incorrectly guessed letters in grey to exclude them in next guess');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('As a player I want to press the enter button to submit my guessed word');


  // Fill [placeholder="What needs to be done\?"]
  await page.locator('[placeholder="What needs to be done\\?"]').fill('As a player I want to create an account so that I can play Wordle++');


});