# Meet Your Mayor 2025

**A multi-page Gatsby-powered news application by [Outlier Media](https://outliermedia.org/) adapted from a project by [THE CITY](https://www.thecity.nyc) and [Gothamist](https://gothamist.com/), designed to inform Detroiters about the 2025 Detroit mayoral candidates.**

## 🛠️ Technologies Used

- **[Gatsby](https://www.gatsbyjs.com/)**: A React-based open-source framework for creating fast websites.
- **[React](https://react.dev/)**: For building dynamic user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety and better developer experience.
- **[ArchieML](https://archieml.org/)**: For syncing site content with Google Docs used by editorial staff.
- **[Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)**: For global state management (see [useAppStore.ts](src/useAppStore.ts) for implementation).

## 📁 Project Structure

```
2025-meet-your-mayor/
├── src/                  # Source files
│   ├── @types/           # Custom type declarations
│   ├── assets/           # Logos
│   ├── components/       # Reusable UI components
│   ├── pages/            # Pages (using Gatsby page logic)
│   └── styles/           # Custom SCSS styles
├── static/               # Static assets, like photos and illustrations
├── .github/              # Scripts for running Github Actions
├── .env                  # Client-accessible environment variables
├── candidate-content.js  # JS object with each candidate's info and question responses
├── candidate-list.json   # A JSON list of each candidate and their full name
├── question-content.js   # JS object with each quiz question and set of responses
├── correction-content.js # JS object with any corrections
├── gatsby-config.js      # Gatsby configuration
├── gatsby-node.js        # Gatsby Node APIs
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
└── LICENSE               # Project license
```

## ⚙️ Getting Started

First you’ll need to clone this repository down to your computer to work with the code.

Open up your terminal and cd to your code folder. Clone the project into your folder. This will copy the project onto your computer.

```sh
gh repo clone https://github.com/thecityny/2025-meet-your-mayor
```

Once the repository has finished downloading, cd into it and install the Node.js dependencies.

```sh
cd 2025-meet-your-mayor
npm install
```

Once the dependencies have been installed, you’re ready to preview the project. Run the following to start the test server.

```sh
npm start
```

Now go to `localhost:8000` in your browser. You should see a copy of the Meet Your Mayor site ready for your customizations.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `FILENAME=XXXXXX DOCID=XXXXXX npm run download-content` (CUSTOM)

Runs the `downloadGoogleDocContent` function inside `src/scripts.js`. This function uses [ArchieML](http://archieml.org/) to download content from a Google Doc and save it in a JavaScript object variable in `[FILENAME]-content.js` in the `src` directory.

This current iteration of the project downloads from two different google docs via the two options: `FILENAME = candidate` and `FILENAME = questions`. However, you can edit the `downloadGoogleDocContent` function inside `src/scripts.js` to work with whatever set of documents makes sense for your project. Using this integration is totally optional — feel free to edit the content in `candidate-content.js`, `question-content.js`, and `candidate-list.json` directly.

NOTE: Before you run this command you'll need to create a Google Service Account, store the JSON credentials in the environment variable `GOOGLE_SERVICE_ACCOUNT`, and grant the service account user access to all docs you'll be downloading.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Using this code as a template

This code is free and open source and you are permitted to use for your own projects under the [Apache 2.0 License](LICENSE) included in this repository. However, before deploying anything publicly using this codebase, you must:

- Change [`_fonts/scss`](src/styles/_fonts.scss) — our fonts are proprietary and are not permitted for use outside of THE CITY's domain. Please change these fonts to ones you own publishing rights to, or use free, web-safe fonts instead.
- Remove [`logo.svg`](src/assets/logo.svg) and [`logo-gothamist.svg`](src/assets/logo-gothamist.svg) — our logos are trademarked and cannot be used without THE CITY and Gothamist's explicit permission. Please remove these logos [from the header](src/components/PageLayout.tsx), or swap in your own logo.
- Remove all items inside the [`static`](static) directory — these are licensed photos and illustrations that only THE CITY and Gothamist are authorized to use.

Also, as part of our license, we require that any online publication of work built using this software **include a credit and link to THE CITY**. The template includes the suggested sentence “Made with ♥ in NYC...” in the page footer — feel free to leave that in.

Lastly, we want to hear from you! We'd love to know if you are using this code to publish your own projects. Drop us a line at [data@thecity.nyc](mailto:data@thecity.nyc).

## Deploying to AWS

We've set up automatic deployment to AWS S3 based on the [Baker Rig](https://github.com/datadesk/baker) project by the L.A. Times. See these instructions on how to set that up:

### Configuring your account

Before you can deploy an app created by this repository, you will need to configure your Amazon AWS account and add a set of credentials to your GitHub account.

First, you'll need to create two buckets in Amazon's S3 storage service. One is for your staging site. The other is for your production site. For this simple example, each should allow public access and be [configured to serve a static website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html). You'll also need a Cloudfront distribution for each environment.

The names of those buckets should then be stored as GitHub "vars" accessible to the Actions that deploy the site. You should visit [your settings panel for your account or organization](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-an-organization).

You'll need to add the following vars for your S3 buckets, Cloudfront distributions, published domains, and the Google Doc IDs for your docs.

| Name                       | Value                                                  |
| :------------------------- | :----------------------------------------------------- |
| `S3_BUCKET_STAGING`    | The name of your staging bucket      |
| `S3_BUCKET_PRODUCTION` | The name of your production bucket                     |
| `CLOUDFRONT_DISTRIBUTION_STAGING` | The ID of your staging distribution |
| `CLOUDFRONT_DISTRIBUTION_PRODUCTION` | The ID of your production distribution |
| `DOMAIN_STAGING` | The domain of your staging site |
| `DOMAIN_PRODUCTION` | The domain of your production site |
| `DOCID_CANDIDATES` | The document ID for your candidates |
| `DOCID_CORRECTIONS` | The document ID for your corrections |
| `DOCID_QUESTIONS` | The document ID for your questions |
| `AWS_ACCOUNT_ID` | The AWS account your resources are in |
| `AWS_IAM_ROLE` | The AWS IAM role used to deploy your resources |

### Staging your work

[A GitHub Action](https://github.com/datadesk/baker-example-page-template/actions/workflows/deploy-stage.yml) included with this repository will automatically publish to staging on updates to `main`.

### Publishing your work

Before you send your page live, you should settle on a final slug for the URL. This will set the subdirectory in your bucket where the page will be published. This feature allows The Times to publish numerous pages inside the same bucket with each page managed by a different repository.

Step one is to enter the slug for your URL into the `.env` configuration file.

```yaml
GATSBY_SLUG: your-page-slug
```

You should also set the domain within the `.env` configuration file to match your production bucket url.

```yaml
GATSBY_DOMAIN: https://your-production-bucket-url/
```

It’s never a bad idea to make sure your slug hasn’t already been taken. You can do that by visiting `https://your-production-bucket-url/your-slug/` and ensuring it returns a page not found error.

You can then deploy your site by clicking on the "Deploy" workflow, clicking "Run workflow", then selecting the environment you would like to publish to.

## Learn More About Gatsby

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

To learn React, check out the [React documentation](https://reactjs.org/).
