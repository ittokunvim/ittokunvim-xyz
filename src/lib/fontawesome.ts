import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";

// 除外キーを共通化
const DEFAULT_EXCLUDED_KEYS = ["prefix"];

// 共通処理を関数化
function extractIcons<T extends Record<string, unknown>>(
  icons: T,
  excludedKeys: string[] = DEFAULT_EXCLUDED_KEYS
): IconDefinition[] {
  return Object.keys(icons)
    .filter((key) => !excludedKeys.includes(key))
    .map((icon) => icons[icon] as IconDefinition);
}

// アイコンセットを定義
const iconSets = [
  { icons: SolidIcons, excludedKeys: ["fas", ...DEFAULT_EXCLUDED_KEYS] },
  { icons: RegularIcons, excludedKeys: ["far", ...DEFAULT_EXCLUDED_KEYS] },
  { icons: BrandIcons, excludedKeys: ["fab", ...DEFAULT_EXCLUDED_KEYS] },
];

// 各アイコンリストを作成して結合
export const iconLibrary = iconSets.flatMap(({ icons, excludedKeys, }) => {
  return extractIcons(icons, excludedKeys);
});

