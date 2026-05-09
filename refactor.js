/* eslint-env node */
const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const srcDir = path.join(projectRoot, 'src');
const componentsDir = path.join(srcDir, 'components');

const fileMappings = {
  // about
  'About.jsx': 'about',
  'TeamSection.jsx': 'about',
  'OfficesCarousel.jsx': 'about',
  // animations
  'AnimatedCtaBackground.jsx': 'animations',
  'AnimatedHeroBackground.jsx': 'animations',
  // article
  'ArticleCard.jsx': 'article',
  'ArticleComments.jsx': 'article',
  'ArticleContent.jsx': 'article',
  'ArticleHero.jsx': 'article',
  'ArticleSidebar.jsx': 'article',
  'RelatedArticles.jsx': 'article',
  // carousels
  'IntegrationsCarousel.jsx': 'carousels',
  'SwipeableCarousel.jsx': 'carousels',
  'WebinarsCarousel.jsx': 'carousels',
  // contact
  'ContactCTA.jsx': 'contact',
  'ContactFAQ.jsx': 'contact',
  'ContactForm.jsx': 'contact',
  'ContactHero.jsx': 'contact',
  'ContactInfo.jsx': 'contact',
  'ContactMethods.jsx': 'contact',
  'ContactTestimonials.jsx': 'contact',
  // news
  'NewsCard.jsx': 'news',
  'NewsFilter.jsx': 'news',
  'NewsGrid.jsx': 'news',
  'NewsHero.jsx': 'news',
  'NewsSidebar.jsx': 'news',
  // resources
  'ResourcesCTA.jsx': 'resources',
  'ResourcesFAQ.jsx': 'resources',
  'ResourcesFilter.jsx': 'resources',
  'ResourcesGrid.jsx': 'resources',
  'ResourcesHero.jsx': 'resources',
  'ResourcesSidebar.jsx': 'resources',
  'ResourcesStatsSection.jsx': 'resources',
  'FeaturedResources.jsx': 'resources',
  'ResourceCard.jsx': 'resources',
  // tools
  'ToolsCTA.jsx': 'tools',
  'ToolsCategoriesSection.jsx': 'tools',
  'ToolsFAQ.jsx': 'tools',
  'ToolsFilter.jsx': 'tools',
  'ToolsGrid.jsx': 'tools',
  'ToolsHero.jsx': 'tools',
  'ToolsSidebar.jsx': 'tools',
  'ToolsStatsSection.jsx': 'tools',
  'ToolCard.jsx': 'tools',
  'ToolComparator.jsx': 'tools',
  'ToolTestimonialsCarousel.jsx': 'tools',
  'FeaturedTools.jsx': 'tools',
  // shared
  'MicroInteraction.jsx': 'shared',
  'FormField.jsx': 'shared',
  'ResponsiveImage.jsx': 'shared',
  'CallToAction.jsx': 'shared',
  'WelcomeMessage.jsx': 'shared',
  // home
  'Hero.jsx': 'home',
  'HeroImage.jsx': 'home',
  'CategoriesSection.jsx': 'home',
  'CategoryFilter.jsx': 'home',
  'Services.jsx': 'home',
  'ServiceCard.jsx': 'home',
  'Portfolio.jsx': 'home',
  'Stats.jsx': 'home',
  'Testimonials.jsx': 'home',
  'TestimonialCard.jsx': 'home',
  'TrustedClients.jsx': 'home',
};

const actualMoves = {}; 
for (const [file, folder] of Object.entries(fileMappings)) {
  const dirPath = path.join(componentsDir, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const oldPath = path.join(componentsDir, file);
  const newPath = path.join(dirPath, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file} to ${folder}`);
    actualMoves[file.replace(/\.jsx?$/, '')] = folder;
  }
}

console.log('Actual moves:', Object.keys(actualMoves).length);

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    // skip node_modules and hidden dirs
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      const importRegex = /(['"])((?:\.\.\/)*|\.\/|@\/)components\/([a-zA-Z0-9_-]+)(['"])/g;
      
      content = content.replace(importRegex, (match, quote1, prefix, compName, quote2) => {
        if (actualMoves[compName]) {
          changed = true;
          return `${quote1}${prefix}components/${actualMoves[compName]}/${compName}${quote2}`;
        }
        return match;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done refactoring!');
