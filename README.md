# Read World App - Client application

This is Dotnet Kestrel based version [Real World App Angular 2](https://github.com/gothinkster/angular2-realworld-example-app) singe page application built with Angular2 and TypeScript.

The client development and production code is built with [`angular-cli` tool](https://github.com/angular/angular-cli) and prepared for hosting with Dotnet Kestrel server.

The project comes with [`Kudu` platform](https://github.com/projectkudu/kudu) deployment script `deploy.cmd`.

The Dotnet web site uses custom hosting configuration to match `angular-cli` built-in patterns for building and bundling client side code. That is the web root for ASP.NET web site is specified as `dist` directory and custom `hosting.json` configuration file is used.

## Azure Web Application deployment

This project shows how to integrate Dotnet Core web application built with Angular `angular-cli` cli tool. The final application is published as the Azure web site using `deploy.cmd` deployment script.

### Prepare Azure Web site machine appplications

This web app is deployed using Azure [Web Application](Web Apps overview
) container from [App Service Platform](https://azure.microsoft.com/en-us/services/app-service/) solution.


Before you start deployement log into your web application Kudu service tools page to verify it has a NodeJS and NPM installed:

- [Exploring the Super Secret Kudu Debug Console - with David Ebbo](https://azure.microsoft.com/en-us/documentation/videos/super-secret-kudu-debug-console-for-azure-web-sites/)
- [Windows Azure Websites online tools you should know about](https://azure.microsoft.com/en-us/blog/windows-azure-websites-online-tools-you-should-know-about/)

### NodeJS and NPM version

Set your website NodeJS version:

```.ini
WEBSITE_NODE_DEFAULT_VERSION = 6.7.0
```

This will setup NodeJS to 6.7.0 and NPM to 3.10.3

### Enable Private Extensions

Set your web application to support private extension [OPT]:

```.ini
WEBSITE_PRIVATE_EXTENSIONS = 1
```

### Deployment

This website has been published to Azure: [https://real-world-app.azurewebsites.net/](https://real-world-app.azurewebsites.net/) and it uses GitHub automation feature. The custom `.deployment` configuration points to `Deploy.cmd` which is used by Kudu service when deploying this Dotnet application.

See:

- [Customizing deployments](https://github.com/projectkudu/kudu/wiki/Customizing-deployments)
- [.deployment file](https://github.com/projectkudu/kudu/wiki/Customizing-deployments#deployment-file)

The custom steps added to default ASP.NET Core web application deployment script:

- install `angular-cli` command line tool: `call npm install ng --production --silent`
- install production only `NPM` packages for client application: `call npm install --production --silent`
- install single NPM package required by TypeScript build phase when `ng` tool is producing output: `call npm install @types/node --silent`
- install single NPM package required by TypeScript build phase when `ng` tool is producing output: `call npm install @types/marked --silent`
- run `angular-cli` build with production settings: `call ng build --prod --silent`

After all of this steps complete Dotnet application is published to target directory.

Then comes a quick fix to `angular-cli` issue to provide `favicon.ico` to `dist` directory: `call COPY /Y "%DEPLOYMENT_SOURCE%\site\repository\src\favicon.ico" "%DEPLOYMENT_TEMP%\dist\favicon.ico"`

The Kudu invokes copy process and current instance of application is replaced by newly built one.

## Author

@peterblazejewicz
