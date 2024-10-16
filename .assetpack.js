import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: 'src/components/games/slither/raw-assets',
    output: './public/slither/assets/',
    cache: true,
    pipes: [
        ...pixiPipes({
            texturePacker: {
                texturePacker: {
                    removeFileExtension: true,
                },
            },
            manifest: {
                output: './public/slither/assets/assets-manifest.json',
            }
        }),
    ],
};
