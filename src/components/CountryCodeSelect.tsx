import { useState, useMemo } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// 完整的国际区号列表
export const countryCodes = [
  // 亚洲
  { code: "+86", flag: "🇨🇳", country: { zh: "中国", "zh-TW": "中國", en: "China" } },
  { code: "+852", flag: "🇭🇰", country: { zh: "香港", "zh-TW": "香港", en: "Hong Kong" } },
  { code: "+853", flag: "🇲🇴", country: { zh: "澳门", "zh-TW": "澳門", en: "Macau" } },
  { code: "+886", flag: "🇹🇼", country: { zh: "台湾", "zh-TW": "台灣", en: "Taiwan" } },
  { code: "+81", flag: "🇯🇵", country: { zh: "日本", "zh-TW": "日本", en: "Japan" } },
  { code: "+82", flag: "🇰🇷", country: { zh: "韩国", "zh-TW": "韓國", en: "South Korea" } },
  { code: "+850", flag: "🇰🇵", country: { zh: "朝鲜", "zh-TW": "朝鮮", en: "North Korea" } },
  { code: "+65", flag: "🇸🇬", country: { zh: "新加坡", "zh-TW": "新加坡", en: "Singapore" } },
  { code: "+60", flag: "🇲🇾", country: { zh: "马来西亚", "zh-TW": "馬來西亞", en: "Malaysia" } },
  { code: "+66", flag: "🇹🇭", country: { zh: "泰国", "zh-TW": "泰國", en: "Thailand" } },
  { code: "+84", flag: "🇻🇳", country: { zh: "越南", "zh-TW": "越南", en: "Vietnam" } },
  { code: "+62", flag: "🇮🇩", country: { zh: "印度尼西亚", "zh-TW": "印尼", en: "Indonesia" } },
  { code: "+63", flag: "🇵🇭", country: { zh: "菲律宾", "zh-TW": "菲律賓", en: "Philippines" } },
  { code: "+91", flag: "🇮🇳", country: { zh: "印度", "zh-TW": "印度", en: "India" } },
  { code: "+92", flag: "🇵🇰", country: { zh: "巴基斯坦", "zh-TW": "巴基斯坦", en: "Pakistan" } },
  { code: "+880", flag: "🇧🇩", country: { zh: "孟加拉", "zh-TW": "孟加拉", en: "Bangladesh" } },
  { code: "+94", flag: "🇱🇰", country: { zh: "斯里兰卡", "zh-TW": "斯里蘭卡", en: "Sri Lanka" } },
  { code: "+977", flag: "🇳🇵", country: { zh: "尼泊尔", "zh-TW": "尼泊爾", en: "Nepal" } },
  { code: "+95", flag: "🇲🇲", country: { zh: "缅甸", "zh-TW": "緬甸", en: "Myanmar" } },
  { code: "+855", flag: "🇰🇭", country: { zh: "柬埔寨", "zh-TW": "柬埔寨", en: "Cambodia" } },
  { code: "+856", flag: "🇱🇦", country: { zh: "老挝", "zh-TW": "老撾", en: "Laos" } },
  { code: "+673", flag: "🇧🇳", country: { zh: "文莱", "zh-TW": "汶萊", en: "Brunei" } },
  { code: "+976", flag: "🇲🇳", country: { zh: "蒙古", "zh-TW": "蒙古", en: "Mongolia" } },
  { code: "+7", flag: "🇰🇿", country: { zh: "哈萨克斯坦", "zh-TW": "哈薩克", en: "Kazakhstan" } },
  { code: "+998", flag: "🇺🇿", country: { zh: "乌兹别克斯坦", "zh-TW": "烏茲別克", en: "Uzbekistan" } },
  { code: "+993", flag: "🇹🇲", country: { zh: "土库曼斯坦", "zh-TW": "土庫曼", en: "Turkmenistan" } },
  { code: "+992", flag: "🇹🇯", country: { zh: "塔吉克斯坦", "zh-TW": "塔吉克", en: "Tajikistan" } },
  { code: "+996", flag: "🇰🇬", country: { zh: "吉尔吉斯斯坦", "zh-TW": "吉爾吉斯", en: "Kyrgyzstan" } },
  { code: "+93", flag: "🇦🇫", country: { zh: "阿富汗", "zh-TW": "阿富汗", en: "Afghanistan" } },
  { code: "+98", flag: "🇮🇷", country: { zh: "伊朗", "zh-TW": "伊朗", en: "Iran" } },
  { code: "+964", flag: "🇮🇶", country: { zh: "伊拉克", "zh-TW": "伊拉克", en: "Iraq" } },
  { code: "+966", flag: "🇸🇦", country: { zh: "沙特阿拉伯", "zh-TW": "沙烏地阿拉伯", en: "Saudi Arabia" } },
  { code: "+971", flag: "🇦🇪", country: { zh: "阿联酋", "zh-TW": "阿聯酋", en: "UAE" } },
  { code: "+974", flag: "🇶🇦", country: { zh: "卡塔尔", "zh-TW": "卡達", en: "Qatar" } },
  { code: "+973", flag: "🇧🇭", country: { zh: "巴林", "zh-TW": "巴林", en: "Bahrain" } },
  { code: "+968", flag: "🇴🇲", country: { zh: "阿曼", "zh-TW": "阿曼", en: "Oman" } },
  { code: "+965", flag: "🇰🇼", country: { zh: "科威特", "zh-TW": "科威特", en: "Kuwait" } },
  { code: "+967", flag: "🇾🇪", country: { zh: "也门", "zh-TW": "葉門", en: "Yemen" } },
  { code: "+962", flag: "🇯🇴", country: { zh: "约旦", "zh-TW": "約旦", en: "Jordan" } },
  { code: "+961", flag: "🇱🇧", country: { zh: "黎巴嫩", "zh-TW": "黎巴嫩", en: "Lebanon" } },
  { code: "+963", flag: "🇸🇾", country: { zh: "叙利亚", "zh-TW": "敘利亞", en: "Syria" } },
  { code: "+972", flag: "🇮🇱", country: { zh: "以色列", "zh-TW": "以色列", en: "Israel" } },
  { code: "+970", flag: "🇵🇸", country: { zh: "巴勒斯坦", "zh-TW": "巴勒斯坦", en: "Palestine" } },
  { code: "+90", flag: "🇹🇷", country: { zh: "土耳其", "zh-TW": "土耳其", en: "Turkey" } },
  { code: "+994", flag: "🇦🇿", country: { zh: "阿塞拜疆", "zh-TW": "亞塞拜然", en: "Azerbaijan" } },
  { code: "+374", flag: "🇦🇲", country: { zh: "亚美尼亚", "zh-TW": "亞美尼亞", en: "Armenia" } },
  { code: "+995", flag: "🇬🇪", country: { zh: "格鲁吉亚", "zh-TW": "喬治亞", en: "Georgia" } },
  { code: "+357", flag: "🇨🇾", country: { zh: "塞浦路斯", "zh-TW": "賽普勒斯", en: "Cyprus" } },
  
  // 北美洲
  { code: "+1", flag: "🇺🇸", country: { zh: "美国", "zh-TW": "美國", en: "USA" } },
  { code: "+1", flag: "🇨🇦", country: { zh: "加拿大", "zh-TW": "加拿大", en: "Canada" } },
  { code: "+52", flag: "🇲🇽", country: { zh: "墨西哥", "zh-TW": "墨西哥", en: "Mexico" } },
  { code: "+1", flag: "🇯🇲", country: { zh: "牙买加", "zh-TW": "牙買加", en: "Jamaica" } },
  { code: "+1", flag: "🇹🇹", country: { zh: "特立尼达和多巴哥", "zh-TW": "千里達及托巴哥", en: "Trinidad" } },
  { code: "+1", flag: "🇧🇸", country: { zh: "巴哈马", "zh-TW": "巴哈馬", en: "Bahamas" } },
  { code: "+1", flag: "🇧🇧", country: { zh: "巴巴多斯", "zh-TW": "巴貝多", en: "Barbados" } },
  { code: "+1", flag: "🇩🇴", country: { zh: "多米尼加", "zh-TW": "多明尼加", en: "Dominican Rep." } },
  { code: "+1", flag: "🇵🇷", country: { zh: "波多黎各", "zh-TW": "波多黎各", en: "Puerto Rico" } },
  { code: "+53", flag: "🇨🇺", country: { zh: "古巴", "zh-TW": "古巴", en: "Cuba" } },
  { code: "+509", flag: "🇭🇹", country: { zh: "海地", "zh-TW": "海地", en: "Haiti" } },
  { code: "+506", flag: "🇨🇷", country: { zh: "哥斯达黎加", "zh-TW": "哥斯達黎加", en: "Costa Rica" } },
  { code: "+507", flag: "🇵🇦", country: { zh: "巴拿马", "zh-TW": "巴拿馬", en: "Panama" } },
  { code: "+502", flag: "🇬🇹", country: { zh: "危地马拉", "zh-TW": "瓜地馬拉", en: "Guatemala" } },
  { code: "+503", flag: "🇸🇻", country: { zh: "萨尔瓦多", "zh-TW": "薩爾瓦多", en: "El Salvador" } },
  { code: "+504", flag: "🇭🇳", country: { zh: "洪都拉斯", "zh-TW": "宏都拉斯", en: "Honduras" } },
  { code: "+505", flag: "🇳🇮", country: { zh: "尼加拉瓜", "zh-TW": "尼加拉瓜", en: "Nicaragua" } },
  { code: "+501", flag: "🇧🇿", country: { zh: "伯利兹", "zh-TW": "貝里斯", en: "Belize" } },

  // 南美洲
  { code: "+55", flag: "🇧🇷", country: { zh: "巴西", "zh-TW": "巴西", en: "Brazil" } },
  { code: "+54", flag: "🇦🇷", country: { zh: "阿根廷", "zh-TW": "阿根廷", en: "Argentina" } },
  { code: "+56", flag: "🇨🇱", country: { zh: "智利", "zh-TW": "智利", en: "Chile" } },
  { code: "+57", flag: "🇨🇴", country: { zh: "哥伦比亚", "zh-TW": "哥倫比亞", en: "Colombia" } },
  { code: "+51", flag: "🇵🇪", country: { zh: "秘鲁", "zh-TW": "秘魯", en: "Peru" } },
  { code: "+58", flag: "🇻🇪", country: { zh: "委内瑞拉", "zh-TW": "委內瑞拉", en: "Venezuela" } },
  { code: "+593", flag: "🇪🇨", country: { zh: "厄瓜多尔", "zh-TW": "厄瓜多爾", en: "Ecuador" } },
  { code: "+591", flag: "🇧🇴", country: { zh: "玻利维亚", "zh-TW": "玻利維亞", en: "Bolivia" } },
  { code: "+595", flag: "🇵🇾", country: { zh: "巴拉圭", "zh-TW": "巴拉圭", en: "Paraguay" } },
  { code: "+598", flag: "🇺🇾", country: { zh: "乌拉圭", "zh-TW": "烏拉圭", en: "Uruguay" } },
  { code: "+592", flag: "🇬🇾", country: { zh: "圭亚那", "zh-TW": "圭亞那", en: "Guyana" } },
  { code: "+597", flag: "🇸🇷", country: { zh: "苏里南", "zh-TW": "蘇利南", en: "Suriname" } },

  // 欧洲
  { code: "+44", flag: "🇬🇧", country: { zh: "英国", "zh-TW": "英國", en: "United Kingdom" } },
  { code: "+49", flag: "🇩🇪", country: { zh: "德国", "zh-TW": "德國", en: "Germany" } },
  { code: "+33", flag: "🇫🇷", country: { zh: "法国", "zh-TW": "法國", en: "France" } },
  { code: "+39", flag: "🇮🇹", country: { zh: "意大利", "zh-TW": "義大利", en: "Italy" } },
  { code: "+34", flag: "🇪🇸", country: { zh: "西班牙", "zh-TW": "西班牙", en: "Spain" } },
  { code: "+351", flag: "🇵🇹", country: { zh: "葡萄牙", "zh-TW": "葡萄牙", en: "Portugal" } },
  { code: "+31", flag: "🇳🇱", country: { zh: "荷兰", "zh-TW": "荷蘭", en: "Netherlands" } },
  { code: "+32", flag: "🇧🇪", country: { zh: "比利时", "zh-TW": "比利時", en: "Belgium" } },
  { code: "+41", flag: "🇨🇭", country: { zh: "瑞士", "zh-TW": "瑞士", en: "Switzerland" } },
  { code: "+43", flag: "🇦🇹", country: { zh: "奥地利", "zh-TW": "奧地利", en: "Austria" } },
  { code: "+46", flag: "🇸🇪", country: { zh: "瑞典", "zh-TW": "瑞典", en: "Sweden" } },
  { code: "+47", flag: "🇳🇴", country: { zh: "挪威", "zh-TW": "挪威", en: "Norway" } },
  { code: "+45", flag: "🇩🇰", country: { zh: "丹麦", "zh-TW": "丹麥", en: "Denmark" } },
  { code: "+358", flag: "🇫🇮", country: { zh: "芬兰", "zh-TW": "芬蘭", en: "Finland" } },
  { code: "+354", flag: "🇮🇸", country: { zh: "冰岛", "zh-TW": "冰島", en: "Iceland" } },
  { code: "+353", flag: "🇮🇪", country: { zh: "爱尔兰", "zh-TW": "愛爾蘭", en: "Ireland" } },
  { code: "+30", flag: "🇬🇷", country: { zh: "希腊", "zh-TW": "希臘", en: "Greece" } },
  { code: "+48", flag: "🇵🇱", country: { zh: "波兰", "zh-TW": "波蘭", en: "Poland" } },
  { code: "+420", flag: "🇨🇿", country: { zh: "捷克", "zh-TW": "捷克", en: "Czech Republic" } },
  { code: "+421", flag: "🇸🇰", country: { zh: "斯洛伐克", "zh-TW": "斯洛伐克", en: "Slovakia" } },
  { code: "+36", flag: "🇭🇺", country: { zh: "匈牙利", "zh-TW": "匈牙利", en: "Hungary" } },
  { code: "+40", flag: "🇷🇴", country: { zh: "罗马尼亚", "zh-TW": "羅馬尼亞", en: "Romania" } },
  { code: "+359", flag: "🇧🇬", country: { zh: "保加利亚", "zh-TW": "保加利亞", en: "Bulgaria" } },
  { code: "+385", flag: "🇭🇷", country: { zh: "克罗地亚", "zh-TW": "克羅埃西亞", en: "Croatia" } },
  { code: "+386", flag: "🇸🇮", country: { zh: "斯洛文尼亚", "zh-TW": "斯洛維尼亞", en: "Slovenia" } },
  { code: "+381", flag: "🇷🇸", country: { zh: "塞尔维亚", "zh-TW": "塞爾維亞", en: "Serbia" } },
  { code: "+382", flag: "🇲🇪", country: { zh: "黑山", "zh-TW": "蒙特內哥羅", en: "Montenegro" } },
  { code: "+387", flag: "🇧🇦", country: { zh: "波黑", "zh-TW": "波士尼亞", en: "Bosnia" } },
  { code: "+389", flag: "🇲🇰", country: { zh: "北马其顿", "zh-TW": "北馬其頓", en: "North Macedonia" } },
  { code: "+355", flag: "🇦🇱", country: { zh: "阿尔巴尼亚", "zh-TW": "阿爾巴尼亞", en: "Albania" } },
  { code: "+383", flag: "🇽🇰", country: { zh: "科索沃", "zh-TW": "科索沃", en: "Kosovo" } },
  { code: "+370", flag: "🇱🇹", country: { zh: "立陶宛", "zh-TW": "立陶宛", en: "Lithuania" } },
  { code: "+371", flag: "🇱🇻", country: { zh: "拉脱维亚", "zh-TW": "拉脫維亞", en: "Latvia" } },
  { code: "+372", flag: "🇪🇪", country: { zh: "爱沙尼亚", "zh-TW": "愛沙尼亞", en: "Estonia" } },
  { code: "+375", flag: "🇧🇾", country: { zh: "白俄罗斯", "zh-TW": "白俄羅斯", en: "Belarus" } },
  { code: "+380", flag: "🇺🇦", country: { zh: "乌克兰", "zh-TW": "烏克蘭", en: "Ukraine" } },
  { code: "+373", flag: "🇲🇩", country: { zh: "摩尔多瓦", "zh-TW": "摩爾多瓦", en: "Moldova" } },
  { code: "+7", flag: "🇷🇺", country: { zh: "俄罗斯", "zh-TW": "俄羅斯", en: "Russia" } },
  { code: "+352", flag: "🇱🇺", country: { zh: "卢森堡", "zh-TW": "盧森堡", en: "Luxembourg" } },
  { code: "+377", flag: "🇲🇨", country: { zh: "摩纳哥", "zh-TW": "摩納哥", en: "Monaco" } },
  { code: "+378", flag: "🇸🇲", country: { zh: "圣马力诺", "zh-TW": "聖馬利諾", en: "San Marino" } },
  { code: "+376", flag: "🇦🇩", country: { zh: "安道尔", "zh-TW": "安道爾", en: "Andorra" } },
  { code: "+423", flag: "🇱🇮", country: { zh: "列支敦士登", "zh-TW": "列支敦斯登", en: "Liechtenstein" } },
  { code: "+356", flag: "🇲🇹", country: { zh: "马耳他", "zh-TW": "馬爾他", en: "Malta" } },

  // 大洋洲
  { code: "+61", flag: "🇦🇺", country: { zh: "澳大利亚", "zh-TW": "澳大利亞", en: "Australia" } },
  { code: "+64", flag: "🇳🇿", country: { zh: "新西兰", "zh-TW": "紐西蘭", en: "New Zealand" } },
  { code: "+675", flag: "🇵🇬", country: { zh: "巴布亚新几内亚", "zh-TW": "巴布亞紐幾內亞", en: "Papua New Guinea" } },
  { code: "+679", flag: "🇫🇯", country: { zh: "斐济", "zh-TW": "斐濟", en: "Fiji" } },
  { code: "+685", flag: "🇼🇸", country: { zh: "萨摩亚", "zh-TW": "薩摩亞", en: "Samoa" } },
  { code: "+676", flag: "🇹🇴", country: { zh: "汤加", "zh-TW": "東加", en: "Tonga" } },
  { code: "+678", flag: "🇻🇺", country: { zh: "瓦努阿图", "zh-TW": "瓦努阿圖", en: "Vanuatu" } },
  { code: "+677", flag: "🇸🇧", country: { zh: "所罗门群岛", "zh-TW": "所羅門群島", en: "Solomon Islands" } },

  // 非洲
  { code: "+20", flag: "🇪🇬", country: { zh: "埃及", "zh-TW": "埃及", en: "Egypt" } },
  { code: "+27", flag: "🇿🇦", country: { zh: "南非", "zh-TW": "南非", en: "South Africa" } },
  { code: "+234", flag: "🇳🇬", country: { zh: "尼日利亚", "zh-TW": "奈及利亞", en: "Nigeria" } },
  { code: "+254", flag: "🇰🇪", country: { zh: "肯尼亚", "zh-TW": "肯亞", en: "Kenya" } },
  { code: "+212", flag: "🇲🇦", country: { zh: "摩洛哥", "zh-TW": "摩洛哥", en: "Morocco" } },
  { code: "+213", flag: "🇩🇿", country: { zh: "阿尔及利亚", "zh-TW": "阿爾及利亞", en: "Algeria" } },
  { code: "+216", flag: "🇹🇳", country: { zh: "突尼斯", "zh-TW": "突尼西亞", en: "Tunisia" } },
  { code: "+218", flag: "🇱🇾", country: { zh: "利比亚", "zh-TW": "利比亞", en: "Libya" } },
  { code: "+249", flag: "🇸🇩", country: { zh: "苏丹", "zh-TW": "蘇丹", en: "Sudan" } },
  { code: "+251", flag: "🇪🇹", country: { zh: "埃塞俄比亚", "zh-TW": "衣索比亞", en: "Ethiopia" } },
  { code: "+255", flag: "🇹🇿", country: { zh: "坦桑尼亚", "zh-TW": "坦尚尼亞", en: "Tanzania" } },
  { code: "+256", flag: "🇺🇬", country: { zh: "乌干达", "zh-TW": "烏干達", en: "Uganda" } },
  { code: "+260", flag: "🇿🇲", country: { zh: "赞比亚", "zh-TW": "尚比亞", en: "Zambia" } },
  { code: "+263", flag: "🇿🇼", country: { zh: "津巴布韦", "zh-TW": "辛巴威", en: "Zimbabwe" } },
  { code: "+233", flag: "🇬🇭", country: { zh: "加纳", "zh-TW": "迦納", en: "Ghana" } },
  { code: "+225", flag: "🇨🇮", country: { zh: "科特迪瓦", "zh-TW": "象牙海岸", en: "Ivory Coast" } },
  { code: "+221", flag: "🇸🇳", country: { zh: "塞内加尔", "zh-TW": "塞內加爾", en: "Senegal" } },
  { code: "+237", flag: "🇨🇲", country: { zh: "喀麦隆", "zh-TW": "喀麥隆", en: "Cameroon" } },
  { code: "+243", flag: "🇨🇩", country: { zh: "刚果民主共和国", "zh-TW": "剛果民主共和國", en: "DR Congo" } },
  { code: "+242", flag: "🇨🇬", country: { zh: "刚果共和国", "zh-TW": "剛果共和國", en: "Congo" } },
  { code: "+244", flag: "🇦🇴", country: { zh: "安哥拉", "zh-TW": "安哥拉", en: "Angola" } },
  { code: "+258", flag: "🇲🇿", country: { zh: "莫桑比克", "zh-TW": "莫桑比克", en: "Mozambique" } },
  { code: "+261", flag: "🇲🇬", country: { zh: "马达加斯加", "zh-TW": "馬達加斯加", en: "Madagascar" } },
  { code: "+230", flag: "🇲🇺", country: { zh: "毛里求斯", "zh-TW": "模里西斯", en: "Mauritius" } },
  { code: "+250", flag: "🇷🇼", country: { zh: "卢旺达", "zh-TW": "盧安達", en: "Rwanda" } },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  language: "zh" | "zh-TW" | "en";
}

export function CountryCodeSelect({ value, onChange, language }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCountry = useMemo(() => {
    return countryCodes.find(c => c.code === value);
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countryCodes;
    const query = searchQuery.toLowerCase();
    return countryCodes.filter(c => 
      c.code.includes(query) ||
      c.country.zh.toLowerCase().includes(query) ||
      c.country["zh-TW"].toLowerCase().includes(query) ||
      c.country.en.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto min-w-[100px] justify-between bg-background/50 border-border/50 hover:bg-background/80"
        >
          <span className="flex items-center gap-1">
            {selectedCountry ? (
              <>
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
              </>
            ) : (
              value
            )}
          </span>
          <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-background border-border z-50" align="start">
        <Command>
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              placeholder={language === "en" ? "Search country..." : "搜索国家/地区..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>
              {language === "en" ? "No country found." : "未找到国家/地区"}
            </CommandEmpty>
            <CommandGroup>
              {filteredCountries.map((country, index) => (
                <CommandItem
                  key={`${country.code}-${country.flag}-${index}`}
                  value={`${country.code}-${country.country.en}-${index}`}
                  onSelect={() => {
                    onChange(country.code);
                    setOpen(false);
                    setSearchQuery("");
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex items-center gap-2 flex-1">
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium">{country.code}</span>
                    <span className="text-muted-foreground text-sm truncate">
                      {country.country[language]}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
