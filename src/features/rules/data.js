import { media } from '@/lib/media';

/** The single training video file used by both rule cards (PROD_ASSETS.video in the prototype). */
export const RULE_VIDEO_SRC = media('65768518c4.mp4');

/** `w` = poster width; used as the column's flex-grow and its aspect ratio (w / 421). */
export const RULE_VIDEOS = [
  { t: 'กฎระเบียบและข้อควรปฏิบัติ', poster: media('2448fcf547.jpg'), w: 751 },
  { t: 'พ.ร.บ. คอมพิวเตอร์คืออะไร', poster: media('053ac503cf.jpg'), w: 828 },
];
