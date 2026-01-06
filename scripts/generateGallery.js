import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dbr3xp0bx',
  api_key: '795228952549794',
  api_secret: process.env.CLOUDINARY_API_SECRET || '' // Use environment variable for security
});

async function generateGallery(folderName = 'Wedding') {
  try {
    console.log(`Fetching images from Cloudinary folder: ${folderName}...`);
    
    // Search for images in the specified folder
    const result = await cloudinary.search
      .expression(`folder:${folderName}`)
      .max_results(500)
      .with_field('tags')
      .with_field('context')
      .execute();

    console.log(`Found ${result.total_count} images`);

    // Sort by filename/public_id A-Z
    const sortedResources = result.resources.sort((a, b) => {
      const nameA = (a.filename || a.public_id || '').toLowerCase();
      const nameB = (b.filename || b.public_id || '').toLowerCase();
      return nameA.localeCompare(nameB);
    });

    // Format the data
    const photos = sortedResources.map((resource, index) => {
      // Extract caption from context metadata
      // Cloudinary stores captions in context.caption or context.description
      let caption = null;
      if (resource.context) {
        caption = resource.context.caption || resource.context.description || null;
      }
      
      return {
        id: `photo-${index + 1}`,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        tags: resource.tags || [],
        caption: caption
      };
    });

    // Determine output file and export name based on folder
    const isHoneymoon = folderName.toLowerCase() === 'honeymoon';
    const exportName = isHoneymoon ? 'honeymoonPhotos' : 'weddingPhotos';
    const outputFile = isHoneymoon ? 'honeymoonPhotos.ts' : 'weddingPhotos.ts';

    // Generate TypeScript content
    const tsContent = `// Auto-generated file - Do not edit manually
// Generated from Cloudinary folder: ${folderName}
// Run: node scripts/generateGallery.js${isHoneymoon ? ' honeymoon' : ''}

export const ${exportName} = ${JSON.stringify(photos, null, 2)};
`;

    // Write to file
    const outputPath = path.join(__dirname, '../src/data', outputFile);
    fs.writeFileSync(outputPath, tsContent, 'utf8');
    
    console.log(`✅ Successfully generated ${photos.length} photos to ${outputPath}`);
  } catch (error) {
    console.error('Error generating gallery:', error);
    process.exit(1);
  }
}

// Get folder name from command line argument, default to 'Wedding'
const folderName = process.argv[2] || 'Wedding';
generateGallery(folderName);

