/* eslint-disable max-lines */
import { DroughtDto } from './DroughtDto';
import { FloodDto } from './FloodDto';
import { IncidentDto } from './IncidentDto';
import { floodSpecificKeys } from './mapping';

export const FLOOD = 'FLOOD';
export const DROUGHT = 'DROUGHT';
export const INCIDENT = 'INCIDENT';

export type DisasterType = typeof FLOOD | typeof DROUGHT | typeof INCIDENT;
export type DisasterDtoType = FloodDto | DroughtDto | IncidentDto;

export type FloodSpecificType = Record<keyof typeof floodSpecificKeys, string | undefined>;

interface MappingTypes {
  [key: string]: string;
}

export const DisasterMapping: MappingTypes = {
  flood: '1',
  drought: '2',
};

export const IncidentMapping: MappingTypes = {
  hurricane: '3',
  fire: '4',
  lightning: '5',
  epidemics: '6',
  shorebreak: '7',
  insects: '8',
  traffic_accident: '9',
  drowning: '10',
  collapse: '11',
  weapon: '12',
  other: '99',
};

export const provinces: string[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
];

export const districts: string[] = [
  '0102',
  '0103',
  '0104',
  '0105',
  '0106',
  '0107',
  '0108',
  '0109',
  '0110',
  '0201',
  '0202',
  '0203',
  '0204',
  '0205',
  '0206',
  '0207',
  '0208',
  '0209',
  '0210',
  '0211',
  '0212',
  '0213',
  '0214',
  '0301',
  '0302',
  '0303',
  '0305',
  '0306',
  '0307',
  '0308',
  '0313',
  '0314',
  '0315',
  '0401',
  '0402',
  '0403',
  '0404',
  '0405',
  '0406',
  '0407',
  '0408',
  '0501',
  '0502',
  '0503',
  '0504',
  '0505',
  '0506',
  '0507',
  '0508',
  '0601',
  '0602',
  '0603',
  '0604',
  '0605',
  '0606',
  '0607',
  '0608',
  '0701',
  '0702',
  '0703',
  '0704',
  '0705',
  '0706',
  '0707',
  '0708',
  '0801',
  '0802',
  '0803',
  '0804',
  '0805',
  '0806',
  '0807',
  '0808',
  '0809',
  '0810',
  '0811',
  '0901',
  '0902',
  '0903',
  '0904',
  '0905',
  '0906',
  '0907',
  '1001',
  '1002',
  '1003',
  '1004',
  '1005',
  '1006',
  '1101',
  '1102',
  '1103',
  '1104',
  '1105',
  '1201',
  '1202',
  '1203',
  '1204',
  '1205',
  '1206',
  '1207',
  '1208',
  '1209',
  '1210',
  '1211',
  '1212',
  '1301',
  '1302',
  '1303',
  '1304',
  '1305',
  '1306',
  '1307',
  '1308',
  '1401',
  '1402',
  '1403',
  '1404',
  '1405',
  '1406',
  '1407',
  '1408',
  '1409',
  '1410',
  '1411',
  '1412',
  '1413',
  '1501',
  '1502',
  '1503',
  '1504',
  '1505',
  '1506',
  '1601',
  '1602',
  '1603',
  '1604',
  '1605',
  '1606',
  '1607',
  '1608',
  '1609',
  '1701',
  '1702',
  '1703',
  '1704',
  '1706',
  '1707',
  '1709',
  '1710',
  '1711',
  '1712',
  '1713',
  '1714',
  '1801',
  '1802',
  '1803',
  '1804',
  '1901',
  '1902',
  '1903',
  '1904',
  '1905',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2101',
  '2102',
  '2103',
  '2104',
  '2105',
  '2106',
  '2107',
  '2108',
  '2109',
  '2110',
  '2201',
  '2202',
  '2203',
  '2204',
  '2205',
  '2301',
  '2302',
  '2401',
  '2402',
  '2501',
  '2502',
  '2503',
  '2504',
  '2505',
  '2506',
  '2507',
];

export const communes: string[] = [
  '010201',
  '010202',
  '010203',
  '010204',
  '010205',
  '010206',
  '010207',
  '010208',
  '010209',
  '010210',
  '010211',
  '010212',
  '010213',
  '010301',
  '010302',
  '010303',
  '010304',
  '010305',
  '010306',
  '010401',
  '010402',
  '010403',
  '010404',
  '010405',
  '010406',
  '010407',
  '010408',
  '010409',
  '010501',
  '010502',
  '010503',
  '010505',
  '010506',
  '010507',
  '010509',
  '010602',
  '010603',
  '010604',
  '010605',
  '010606',
  '010607',
  '010608',
  '010701',
  '010702',
  '010703',
  '010704',
  '010705',
  '010706',
  '010801',
  '010802',
  '010803',
  '010804',
  '010805',
  '010806',
  '010807',
  '010808',
  '010901',
  '010902',
  '010903',
  '010904',
  '010905',
  '010906',
  '011001',
  '011002',
  '011003',
  '020101',
  '020102',
  '020103',
  '020104',
  '020105',
  '020106',
  '020107',
  '020108',
  '020201',
  '020202',
  '020203',
  '020204',
  '020205',
  '020206',
  '020207',
  '020208',
  '020209',
  '020210',
  '020301',
  '020302',
  '020303',
  '020304',
  '020305',
  '020306',
  '020307',
  '020308',
  '020309',
  '020310',
  '020401',
  '020402',
  '020403',
  '020404',
  '020405',
  '020406',
  '020407',
  '020408',
  '020501',
  '020502',
  '020503',
  '020504',
  '020505',
  '020506',
  '020507',
  '020601',
  '020602',
  '020603',
  '020604',
  '020605',
  '020606',
  '020607',
  '020608',
  '020609',
  '020701',
  '020702',
  '020703',
  '020704',
  '020705',
  '020801',
  '020802',
  '020803',
  '020804',
  '020805',
  '020806',
  '020807',
  '020808',
  '020809',
  '020810',
  '020901',
  '020902',
  '020903',
  '020904',
  '020905',
  '020906',
  '020907',
  '021001',
  '021002',
  '021003',
  '021004',
  '021005',
  '021006',
  '021101',
  '021102',
  '021103',
  '021104',
  '021105',
  '021201',
  '021202',
  '021203',
  '021204',
  '021205',
  '021206',
  '021301',
  '021302',
  '021303',
  '021304',
  '021305',
  '021306',
  '021401',
  '021402',
  '021403',
  '021404',
  '021405',
  '030101',
  '030102',
  '030103',
  '030104',
  '030105',
  '030106',
  '030107',
  '030108',
  '030109',
  '030110',
  '030111',
  '030112',
  '030201',
  '030202',
  '030203',
  '030204',
  '030205',
  '030206',
  '030207',
  '030208',
  '030301',
  '030302',
  '030303',
  '030304',
  '030305',
  '030306',
  '030307',
  '030308',
  '030309',
  '030310',
  '030501',
  '030502',
  '030503',
  '030504',
  '030601',
  '030602',
  '030603',
  '030604',
  '030605',
  '030606',
  '030607',
  '030608',
  '030609',
  '030610',
  '030611',
  '030612',
  '030613',
  '030614',
  '030615',
  '030701',
  '030702',
  '030703',
  '030704',
  '030705',
  '030706',
  '030707',
  '030708',
  '030709',
  '030710',
  '030711',
  '030801',
  '030802',
  '030803',
  '030804',
  '030805',
  '030806',
  '030807',
  '030808',
  '031301',
  '031302',
  '031303',
  '031304',
  '031305',
  '031306',
  '031307',
  '031308',
  '031309',
  '031310',
  '031311',
  '031312',
  '031313',
  '031314',
  '031315',
  '031401',
  '031402',
  '031403',
  '031404',
  '031405',
  '031406',
  '031407',
  '031408',
  '031409',
  '031410',
  '031411',
  '031412',
  '031413',
  '031414',
  '031501',
  '031503',
  '031504',
  '031505',
  '031506',
  '031507',
  '031508',
  '031509',
  '031510',
  '031512',
  '031513',
  '031514',
  '040101',
  '040102',
  '040103',
  '040104',
  '040105',
  '040106',
  '040107',
  '040108',
  '040109',
  '040110',
  '040111',
  '040201',
  '040202',
  '040203',
  '040204',
  '040205',
  '040301',
  '040302',
  '040303',
  '040304',
  '040401',
  '040402',
  '040403',
  '040404',
  '040405',
  '040406',
  '040407',
  '040408',
  '040409',
  '040501',
  '040502',
  '040503',
  '040504',
  '040505',
  '040506',
  '040507',
  '040508',
  '040509',
  '040510',
  '040601',
  '040602',
  '040603',
  '040604',
  '040605',
  '040606',
  '040607',
  '040608',
  '040609',
  '040610',
  '040611',
  '040612',
  '040613',
  '040701',
  '040702',
  '040703',
  '040704',
  '040705',
  '040706',
  '040707',
  '040708',
  '040709',
  '040801',
  '040802',
  '040803',
  '040804',
  '040805',
  '040806',
  '040807',
  '040808',
  '040809',
  '050101',
  '050102',
  '050103',
  '050104',
  '050105',
  '050106',
  '050107',
  '050108',
  '050109',
  '050110',
  '050111',
  '050112',
  '050113',
  '050114',
  '050115',
  '050201',
  '050202',
  '050203',
  '050204',
  '050205',
  '050301',
  '050302',
  '050303',
  '050304',
  '050305',
  '050306',
  '050307',
  '050308',
  '050309',
  '050310',
  '050311',
  '050312',
  '050313',
  '050401',
  '050402',
  '050403',
  '050404',
  '050405',
  '050501',
  '050502',
  '050503',
  '050504',
  '050505',
  '050506',
  '050507',
  '050508',
  '050509',
  '050510',
  '050511',
  '050512',
  '050513',
  '050514',
  '050515',
  '050601',
  '050602',
  '050603',
  '050604',
  '050605',
  '050606',
  '050607',
  '050608',
  '050609',
  '050610',
  '050611',
  '050613',
  '050701',
  '050702',
  '050703',
  '050704',
  '050705',
  '050706',
  '050707',
  '050708',
  '050709',
  '050710',
  '050711',
  '050712',
  '050713',
  '050714',
  '050715',
  '050801',
  '050802',
  '050804',
  '050805',
  '050806',
  '050807',
  '050808',
  '060101',
  '060102',
  '060103',
  '060104',
  '060105',
  '060106',
  '060107',
  '060108',
  '060109',
  '060110',
  '060111',
  '060112',
  '060113',
  '060114',
  '060115',
  '060116',
  '060117',
  '060118',
  '060201',
  '060202',
  '060203',
  '060204',
  '060205',
  '060206',
  '060207',
  '060208',
  '060209',
  '060210',
  '060211',
  '060301',
  '060302',
  '060303',
  '060304',
  '060306',
  '060308',
  '060309',
  '060310',
  '060401',
  '060402',
  '060403',
  '060404',
  '060405',
  '060406',
  '060407',
  '060501',
  '060502',
  '060503',
  '060504',
  '060505',
  '060601',
  '060602',
  '060603',
  '060604',
  '060605',
  '060606',
  '060607',
  '060608',
  '060609',
  '060701',
  '060702',
  '060703',
  '060704',
  '060705',
  '060706',
  '060707',
  '060708',
  '060709',
  '060710',
  '060801',
  '060802',
  '060803',
  '060804',
  '060805',
  '060806',
  '060807',
  '060808',
  '060809',
  '060810',
  '060811',
  '060812',
  '060813',
  '070101',
  '070102',
  '070103',
  '070104',
  '070105',
  '070106',
  '070107',
  '070108',
  '070109',
  '070110',
  '070111',
  '070201',
  '070202',
  '070203',
  '070204',
  '070205',
  '070206',
  '070207',
  '070208',
  '070209',
  '070210',
  '070211',
  '070212',
  '070213',
  '070214',
  '070215',
  '070301',
  '070302',
  '070303',
  '070304',
  '070305',
  '070306',
  '070307',
  '070308',
  '070309',
  '070310',
  '070311',
  '070312',
  '070313',
  '070314',
  '070315',
  '070401',
  '070402',
  '070403',
  '070404',
  '070405',
  '070406',
  '070407',
  '070501',
  '070502',
  '070503',
  '070504',
  '070505',
  '070506',
  '070507',
  '070508',
  '070509',
  '070510',
  '070601',
  '070602',
  '070603',
  '070604',
  '070605',
  '070606',
  '070607',
  '070608',
  '070609',
  '070612',
  '070613',
  '070614',
  '070615',
  '070616',
  '070701',
  '070702',
  '070703',
  '070704',
  '070705',
  '070707',
  '070708',
  '070709',
  '070711',
  '070712',
  '070713',
  '070715',
  '070716',
  '070717',
  '070718',
  '070719',
  '070801',
  '070802',
  '070803',
  '070804',
  '070805',
  '080101',
  '080102',
  '080103',
  '080104',
  '080105',
  '080106',
  '080107',
  '080108',
  '080109',
  '080113',
  '080115',
  '080116',
  '080117',
  '080118',
  '080122',
  '080125',
  '080127',
  '080128',
  '080201',
  '080202',
  '080203',
  '080204',
  '080206',
  '080207',
  '080208',
  '080211',
  '080301',
  '080302',
  '080303',
  '080304',
  '080305',
  '080306',
  '080307',
  '080308',
  '080309',
  '080310',
  '080311',
  '080312',
  '080313',
  '080314',
  '080315',
  '080316',
  '080317',
  '080318',
  '080401',
  '080402',
  '080403',
  '080404',
  '080405',
  '080407',
  '080408',
  '080409',
  '080410',
  '080411',
  '080412',
  '080501',
  '080502',
  '080503',
  '080504',
  '080505',
  '080506',
  '080507',
  '080601',
  '080602',
  '080603',
  '080604',
  '080605',
  '080606',
  '080607',
  '080608',
  '080609',
  '080610',
  '080611',
  '080612',
  '080613',
  '080614',
  '080615',
  '080703',
  '080704',
  '080707',
  '080708',
  '080709',
  '080710',
  '080711',
  '080801',
  '080803',
  '080804',
  '080807',
  '080808',
  '080809',
  '080811',
  '080813',
  '080814',
  '080816',
  '080901',
  '080902',
  '080903',
  '080904',
  '080905',
  '080906',
  '080907',
  '080910',
  '080911',
  '080913',
  '080914',
  '081001',
  '081002',
  '081003',
  '081004',
  '081005',
  '081006',
  '081007',
  '081008',
  '081009',
  '081010',
  '081011',
  '081012',
  '081013',
  '081014',
  '081015',
  '081016',
  '081101',
  '081102',
  '081103',
  '081104',
  '081105',
  '081106',
  '090101',
  '090102',
  '090103',
  '090104',
  '090201',
  '090202',
  '090203',
  '090301',
  '090302',
  '090303',
  '090304',
  '090401',
  '090402',
  '090403',
  '090501',
  '090502',
  '090503',
  '090601',
  '090602',
  '090603',
  '090604',
  '090605',
  '090606',
  '090701',
  '090702',
  '090703',
  '090704',
  '090705',
  '090706',
  '100101',
  '100102',
  '100103',
  '100104',
  '100105',
  '100106',
  '100107',
  '100108',
  '100207',
  '100208',
  '100209',
  '100210',
  '100211',
  '100301',
  '100302',
  '100303',
  '100304',
  '100305',
  '100306',
  '100307',
  '100308',
  '100401',
  '100402',
  '100403',
  '100404',
  '100405',
  '100406',
  '100407',
  '100408',
  '100409',
  '100410',
  '100501',
  '100502',
  '100503',
  '100504',
  '100505',
  '100506',
  '100601',
  '100602',
  '100603',
  '100604',
  '100605',
  '100606',
  '100607',
  '100608',
  '100609',
  '100610',
  '110101',
  '110102',
  '110103',
  '110104',
  '110105',
  '110201',
  '110202',
  '110203',
  '110204',
  '110205',
  '110206',
  '110301',
  '110302',
  '110401',
  '110402',
  '110403',
  '110404',
  '110501',
  '110502',
  '110503',
  '110504',
  '120101',
  '120102',
  '120103',
  '120104',
  '120105',
  '120106',
  '120107',
  '120108',
  '120109',
  '120110',
  '120111',
  '120112',
  '120201',
  '120202',
  '120203',
  '120204',
  '120205',
  '120206',
  '120207',
  '120208',
  '120209',
  '120210',
  '120211',
  '120301',
  '120302',
  '120303',
  '120304',
  '120305',
  '120306',
  '120307',
  '120308',
  '120401',
  '120402',
  '120403',
  '120404',
  '120405',
  '120406',
  '120407',
  '120408',
  '120409',
  '120410',
  '120501',
  '120507',
  '120508',
  '120510',
  '120512',
  '120513',
  '120514',
  '120515',
  '120516',
  '120517',
  '120518',
  '120519',
  '120520',
  '120601',
  '120602',
  '120606',
  '120607',
  '120608',
  '120609',
  '120610',
  '120611',
  '120612',
  '120702',
  '120703',
  '120704',
  '120706',
  '120711',
  '120712',
  '120713',
  '120714',
  '120801',
  '120802',
  '120803',
  '120807',
  '120808',
  '120809',
  '120901',
  '120903',
  '120904',
  '120905',
  '120906',
  '120908',
  '120909',
  '120910',
  '120911',
  '120913',
  '120914',
  '120915',
  '120916',
  '120917',
  '120918',
  '121001',
  '121002',
  '121003',
  '121004',
  '121005',
  '121101',
  '121102',
  '121103',
  '121104',
  '121105',
  '121201',
  '121202',
  '121203',
  '121204',
  '121205',
  '121206',
  '121207',
  '121208',
  '130101',
  '130102',
  '130103',
  '130104',
  '130105',
  '130106',
  '130201',
  '130202',
  '130203',
  '130204',
  '130205',
  '130206',
  '130207',
  '130208',
  '130301',
  '130302',
  '130303',
  '130304',
  '130305',
  '130306',
  '130307',
  '130308',
  '130401',
  '130402',
  '130403',
  '130404',
  '130405',
  '130406',
  '130501',
  '130502',
  '130503',
  '130504',
  '130505',
  '130506',
  '130507',
  '130508',
  '130509',
  '130510',
  '130511',
  '130512',
  '130601',
  '130602',
  '130603',
  '130604',
  '130605',
  '130703',
  '130704',
  '130705',
  '130706',
  '130801',
  '130802',
  '140101',
  '140102',
  '140103',
  '140104',
  '140105',
  '140106',
  '140107',
  '140108',
  '140109',
  '140201',
  '140202',
  '140203',
  '140204',
  '140205',
  '140206',
  '140207',
  '140208',
  '140301',
  '140302',
  '140303',
  '140304',
  '140305',
  '140306',
  '140307',
  '140308',
  '140309',
  '140310',
  '140311',
  '140312',
  '140313',
  '140401',
  '140402',
  '140403',
  '140404',
  '140405',
  '140406',
  '140407',
  '140408',
  '140501',
  '140502',
  '140503',
  '140504',
  '140505',
  '140506',
  '140507',
  '140508',
  '140601',
  '140602',
  '140603',
  '140604',
  '140605',
  '140606',
  '140607',
  '140608',
  '140609',
  '140610',
  '140701',
  '140702',
  '140703',
  '140704',
  '140705',
  '140706',
  '140707',
  '140708',
  '140801',
  '140802',
  '140803',
  '140805',
  '140807',
  '140808',
  '140809',
  '140810',
  '140811',
  '140901',
  '140902',
  '140903',
  '140904',
  '140905',
  '140906',
  '140907',
  '140908',
  '140909',
  '140910',
  '140911',
  '141001',
  '141002',
  '141003',
  '141101',
  '141102',
  '141103',
  '141104',
  '141105',
  '141106',
  '141107',
  '141201',
  '141202',
  '141203',
  '141204',
  '141205',
  '141206',
  '141207',
  '141208',
  '141209',
  '141210',
  '141211',
  '141301',
  '141302',
  '141303',
  '141304',
  '141305',
  '141306',
  '141307',
  '141308',
  '141309',
  '141310',
  '141311',
  '150101',
  '150102',
  '150103',
  '150104',
  '150105',
  '150106',
  '150107',
  '150108',
  '150109',
  '150110',
  '150201',
  '150203',
  '150204',
  '150205',
  '150206',
  '150207',
  '150208',
  '150209',
  '150210',
  '150301',
  '150302',
  '150303',
  '150304',
  '150305',
  '150306',
  '150307',
  '150308',
  '150309',
  '150310',
  '150311',
  '150401',
  '150402',
  '150403',
  '150404',
  '150405',
  '150406',
  '150407',
  '150501',
  '150503',
  '150504',
  '150505',
  '150506',
  '150507',
  '150508',
  '150601',
  '150602',
  '150603',
  '150604',
  '150605',
  '160101',
  '160103',
  '160104',
  '160201',
  '160202',
  '160203',
  '160204',
  '160301',
  '160302',
  '160303',
  '160304',
  '160305',
  '160306',
  '160401',
  '160402',
  '160403',
  '160404',
  '160405',
  '160406',
  '160501',
  '160502',
  '160503',
  '160504',
  '160505',
  '160506',
  '160601',
  '160602',
  '160603',
  '160604',
  '160605',
  '160606',
  '160607',
  '160701',
  '160702',
  '160703',
  '160704',
  '160705',
  '160706',
  '160707',
  '160801',
  '160802',
  '160901',
  '160903',
  '160904',
  '160905',
  '160906',
  '160907',
  '160908',
  '160909',
  '160910',
  '170101',
  '170102',
  '170103',
  '170104',
  '170105',
  '170106',
  '170107',
  '170201',
  '170202',
  '170203',
  '170204',
  '170301',
  '170302',
  '170303',
  '170304',
  '170305',
  '170306',
  '170401',
  '170402',
  '170403',
  '170404',
  '170405',
  '170406',
  '170407',
  '170408',
  '170409',
  '170410',
  '170411',
  '170412',
  '170601',
  '170602',
  '170603',
  '170604',
  '170605',
  '170606',
  '170607',
  '170608',
  '170609',
  '170610',
  '170701',
  '170702',
  '170703',
  '170704',
  '170705',
  '170707',
  '170708',
  '170709',
  '170710',
  '170711',
  '170712',
  '170713',
  '170715',
  '170716',
  '170902',
  '170903',
  '170904',
  '170905',
  '170906',
  '170907',
  '170908',
  '170909',
  '170910',
  '171001',
  '171002',
  '171003',
  '171004',
  '171005',
  '171006',
  '171007',
  '171008',
  '171009',
  '171010',
  '171011',
  '171012',
  '171013',
  '171101',
  '171102',
  '171103',
  '171104',
  '171105',
  '171106',
  '171107',
  '171108',
  '171109',
  '171110',
  '171201',
  '171202',
  '171203',
  '171204',
  '171205',
  '171206',
  '171301',
  '171302',
  '171303',
  '171304',
  '171305',
  '171401',
  '171402',
  '171403',
  '171404',
  '171405',
  '180101',
  '180102',
  '180103',
  '180104',
  '180105',
  '180106',
  '180201',
  '180202',
  '180203',
  '180204',
  '180205',
  '180206',
  '180207',
  '180208',
  '180209',
  '180210',
  '180211',
  '180212',
  '180213',
  '180214',
  '180215',
  '180301',
  '180302',
  '180303',
  '180304',
  '180401',
  '180402',
  '180403',
  '180404',
  '190101',
  '190102',
  '190103',
  '190104',
  '190105',
  '190106',
  '190107',
  '190201',
  '190202',
  '190203',
  '190204',
  '190205',
  '190206',
  '190207',
  '190301',
  '190302',
  '190303',
  '190304',
  '190305',
  '190401',
  '190402',
  '190403',
  '190404',
  '190501',
  '190502',
  '190503',
  '190504',
  '190505',
  '190506',
  '190507',
  '190508',
  '190509',
  '190510',
  '190511',
  '200103',
  '200104',
  '200105',
  '200108',
  '200109',
  '200110',
  '200201',
  '200202',
  '200203',
  '200204',
  '200205',
  '200206',
  '200207',
  '200208',
  '200209',
  '200211',
  '200212',
  '200301',
  '200302',
  '200303',
  '200304',
  '200305',
  '200306',
  '200307',
  '200308',
  '200309',
  '200310',
  '200401',
  '200402',
  '200403',
  '200404',
  '200405',
  '200406',
  '200407',
  '200408',
  '200409',
  '200410',
  '200411',
  '200412',
  '200413',
  '200414',
  '200415',
  '200416',
  '200501',
  '200502',
  '200503',
  '200504',
  '200505',
  '200507',
  '200508',
  '200509',
  '200510',
  '200511',
  '200512',
  '200513',
  '200514',
  '200515',
  '200516',
  '200517',
  '200601',
  '200602',
  '200603',
  '200604',
  '200605',
  '200606',
  '200607',
  '200702',
  '200703',
  '200704',
  '200705',
  '200706',
  '200707',
  '200708',
  '200709',
  '200711',
  '200801',
  '200802',
  '200803',
  '200804',
  '200805',
  '210101',
  '210102',
  '210103',
  '210104',
  '210105',
  '210106',
  '210201',
  '210202',
  '210203',
  '210204',
  '210205',
  '210206',
  '210207',
  '210208',
  '210209',
  '210210',
  '210211',
  '210212',
  '210213',
  '210214',
  '210215',
  '210301',
  '210302',
  '210303',
  '210304',
  '210305',
  '210401',
  '210402',
  '210403',
  '210404',
  '210405',
  '210406',
  '210407',
  '210408',
  '210409',
  '210410',
  '210411',
  '210412',
  '210501',
  '210502',
  '210503',
  '210504',
  '210505',
  '210506',
  '210601',
  '210602',
  '210603',
  '210604',
  '210605',
  '210606',
  '210607',
  '210608',
  '210609',
  '210610',
  '210611',
  '210612',
  '210613',
  '210701',
  '210702',
  '210703',
  '210704',
  '210705',
  '210706',
  '210707',
  '210708',
  '210709',
  '210710',
  '210711',
  '210801',
  '210802',
  '210803',
  '210901',
  '210902',
  '210903',
  '210904',
  '210905',
  '210906',
  '210907',
  '210908',
  '210909',
  '210910',
  '210911',
  '210912',
  '210913',
  '210914',
  '210915',
  '211001',
  '211002',
  '211003',
  '211004',
  '211005',
  '211006',
  '211007',
  '211008',
  '211009',
  '211010',
  '211011',
  '211012',
  '211013',
  '211014',
  '220101',
  '220103',
  '220104',
  '220105',
  '220106',
  '220201',
  '220202',
  '220203',
  '220204',
  '220301',
  '220302',
  '220303',
  '220304',
  '220401',
  '220402',
  '220403',
  '220404',
  '220405',
  '220501',
  '220502',
  '220503',
  '220504',
  '220505',
  '220506',
  '230101',
  '230103',
  '230201',
  '230202',
  '230203',
  '240101',
  '240102',
  '240103',
  '240104',
  '240201',
  '240202',
  '240203',
  '240204',
  '250101',
  '250102',
  '250103',
  '250104',
  '250105',
  '250106',
  '250107',
  '250201',
  '250202',
  '250203',
  '250204',
  '250205',
  '250206',
  '250207',
  '250208',
  '250209',
  '250210',
  '250211',
  '250212',
  '250301',
  '250302',
  '250303',
  '250304',
  '250305',
  '250306',
  '250307',
  '250308',
  '250309',
  '250310',
  '250311',
  '250312',
  '250313',
  '250314',
  '250401',
  '250402',
  '250403',
  '250404',
  '250405',
  '250406',
  '250407',
  '250501',
  '250502',
  '250503',
  '250504',
  '250505',
  '250506',
  '250507',
  '250508',
  '250601',
  '250602',
  '250701',
  '250702',
  '250703',
  '250704',
  '250705',
  '250706',
  '250707',
  '250708',
  '250709',
  '250710',
  '250711',
  '250712',
  '250713',
  '250714',
];
