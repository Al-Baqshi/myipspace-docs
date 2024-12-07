import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import type { ManifestOptions } from "vite-plugin-pwa";
import manifest from "./webmanifest.json";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My IP Space development docs',
			credits: true,
			customCss: ['./src/styles/custom.css'],
			social: {
				github: 'https://github.com/sanabel-al-firdaws/Starlight-Pwa',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Overview',
					items: [
					  { label: 'About', slug: 'overview/about' },
					  { label: 'User Stories', slug: 'overview/user-stories' },
					  { label: 'Technologies', slug: 'overview/technologies' },
					  { label: 'Workflow', slug: 'overview/workflow' },
					],
				  },
				{
					label: 'Backend',
					items: [
					  { label: 'Setup', slug: 'backend/setup/install' },
					  { label: 'Project Structure', slug: 'backend/setup/project-structure' },
					  { label: 'Users Module', slug: 'backend/modules/users' },
					  { label: 'Entities Module', slug: 'backend/modules/entities' },
					  { label: 'RFP Module', slug: 'backend/modules/rfp' },
					  { label: 'RTS Module', slug: 'backend/modules/rts' },
					  { label: 'Escrow Module', slug: 'backend/modules/escrow' },
					  { label: 'Chat Module', slug: 'backend/modules/chat' },
					  { label: 'Notifications Module', slug: 'backend/modules/notifications' },
					  { label: 'Notes Module', slug: 'backend/modules/notes' },
					  { label: 'Prisma Setup', slug: 'backend/database/prisma-setup' },
					  { label: 'Database Migrations', slug: 'backend/database/migrations' },
					  { label: 'API Endpoints', slug: 'backend/api/endpoints' },
					  { label: 'Docker Setup', slug: 'backend/deployment/docker' },
					  { label: 'Production Deployment', slug: 'backend/deployment/production' },
					],
				  },
				  {
					label: 'On-Chain',
					items: [
					  { label: 'Overview', slug: 'on-chain/overview' },
					  { label: 'Smart Contracts', slug: 'on-chain/smart-contracts' },
					  { label: 'Chainlink Integration', slug: 'on-chain/chainlink-integration' },
					  { label: 'Escrow Contracts', slug: 'on-chain/escrow-contract' },
					  { label: 'Deployment', slug: 'on-chain/deployment' },
					],
				  },		  
			],
			components: {
				Head: './src/components/Head.astro',
				Search: './src/components/Search.astro',			}
		}),
		AstroPWA({
			workbox: {
			  skipWaiting: true,
			  clientsClaim: true,
			  navigateFallback: "/404",
			  ignoreURLParametersMatching: [/./],
			  globPatterns: ['**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}'],
			},
			 experimental: {
			  directoryAndTrailingSlashHandler: true,
			},
			mode: "production",
			registerType: 'autoUpdate',
			manifest: (manifest as Partial<ManifestOptions>)
		  }),
	],
});
