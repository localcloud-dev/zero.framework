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

- Install Node.js if you haven't done it yet

- Clone this repository

```
git clone https://github.com/localcloud-dev/zero.framework.git
```
- Install Node.js dependencies
```
cd zero.framework
npm install
```
- Create a free Supabase account at https://supabase.com/
- Set your Supabase key and base URL in zero.framework/public/app/js/api/api.js
- Start the website (in the project's root folder) and open "http://localhost:5226" in a browser:
```
node website.js
```
- Start the web dashboard in another Terminal window(in the project's root folder)  and open "http://localhost:5225" in a browser:
```
node app.js
```

- (Optional but recommended) Create an account on any SMTP service for transactional emails and connect it to Supabase to remove any limits in sending emails. We recommend to use [Resend](https://resend.com/) or [Loops](https://loops.so/).