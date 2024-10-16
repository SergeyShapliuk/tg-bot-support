import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: 'src/components/games/puzzling/raw-assets',
    output: './public/assets/',
    cache: true,
    pipes: [
        ...pixiPipes({
            texturePacker: {
                texturePacker: {
                    removeFileExtension: true,
                },
            },
            manifest: {
                output: './public/assets/assets-manifest.json',
            }
        }),
    ],
};
