**Note: The project is in active development - API and workflows are subject to change**

### The idea

Instead of wasting your time on learning, trying and checking what is the best frontend framework (I’m talking about Next.js, Vue.js, Remix, Svelte, etc) you can just start developing your project with Zero.Framework now. It hasn’t any dependencies, it doesn’t require building, and it’s written in Vanilla JS.

### Features

- This starter kit relies solely on Vanilla JS and JavaScript modules natively supported by web browsers, eliminating the need for any frontend framework dependencies
- No building required
- If you're already familiar with JavaScript, you won't need to learn any new technologies
- Can be deployed on virtually any cloud provider, the deployment script is included
- It offers a Single Page Application (SPA) template that's ideal for creating web dashboards
- Additionally, it provides server-side rendering for blogs, documentation, websites, and landing pages, which is highly beneficial for SEO
- Deployment with one command with [https://localcloud.dev](LocalCloud)
- Built-in authentication with Supabase (can be easily replaced by any other project)
- File uploading
- Custom domains for users powered by LocalCloud
- The project is released under the MIT License

### What's not included

- UI because this is just a basic starter kit where you can add your own UI

### How to use

- Install Bun.js (a faster, leaner, more modern replacement for Node.js) - https://bun.sh/docs/installation

- Clone this repository

```
git clone https://github.com/localcloud-dev/zero.framework.git
```
- Install Node.js dependencies
```
cd zero.framework
bun install
```
- Create a free Supabase account at https://supabase.com/
- Set your Supabase key and base URL in zero.framework/public/app/js/api/api.js
- Start the website (in the project's root folder) and open "http://localhost:5226" in a browser:
```
bun website.js
```
- Start the web dashboard in another Terminal window(in the project's root folder)  and open "http://localhost:5225" in a browser:
```
bun app.js
```

- (Optional but recommended) Create an account on any SMTP service for transactional emails and connect it to Supabase to remove any limits in sending emails. We recommend to use [Resend](https://resend.com/) or [Loops](https://loops.so/).

### How to deploy

- Order a new server with Ubuntu 22.04, public IP and SSH on your favorite cloud provider. We test a deployment script on Hetzner, Scaleway and DigitalOcean
- SSH into this new server
- Clone a git repository with your app/website based on Zero.Framework
- Run a deployment script in the root of a project folder (update "your_domain_for_website" and "your_domain_for_web_dashboard" with your domains; for example, domain.com and console.domain.com, DNS A records should be linked to IP address of this server) 
```
chmod +x deploy.sh
./deploy.sh -s your_domain_for_website your_domain_for_web_dashboard
```
- Wait a minute and check in a broser that the website and dashboard are available online over https://
- If you want to update the app and website, just pull changes on this server and run a command 
```
pm2 reload all
```

Note: This deployment script doesn't include Supabase deployment (Supabase is used for user management and storing data). You can use Supabase Cloud or LocalCloud to deploy everything you need (Zero.Framework, Supabase and other services you need for your web app can be installed even on one server with LocalCloud).