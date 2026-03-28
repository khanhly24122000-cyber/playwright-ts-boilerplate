import {test, expect} from '@playwright/test';
import path from 'path';
import fs from 'fs';
 
 
test.describe('Handle upload/download file', () => {
    test('upload file successfully', async ({page}) => {
        await page.goto('http://the-internet.herokuapp.com/upload');
        const fileUpload = path.join(__dirname, '../test-data/background.png');
        await page.locator('#file-upload').setInputFiles(fileUpload);
        await page.locator('#file-submit').click();
        await expect(page.locator('#uploaded-files')).toHaveText('background.png');
    });
    test('download file successfully', async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/download');
        const [fileDownload] = await Promise.all([page.waitForEvent('download'),
            page.getByText('webdriverIO.png').click()
        ]);
        const fileName = fileDownload.suggestedFilename();
        const pathFileDownload = path.join(__dirname, `../download/${fileName}`);
        await fileDownload.saveAs(pathFileDownload);
        const fileExists = fs.existsSync(pathFileDownload);
        await expect(fileExists).toBeTruthy();
    });
});