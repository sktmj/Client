import React from "react";
import { Picker } from "@react-native-picker/picker";

const CastePicker = ({ selectedValue, onValueChange }) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => onValueChange(itemValue)}
    >
      <Picker.Item label="Select Caste" value="" />
      <Picker.Item label="AGAMUDAYAR" value="AGAMUDAYAR" />
      <Picker.Item label="Asari" value="Asari" />
      <Picker.Item label="BC" value="BC" />
      <Picker.Item label="Boyar" value="Boyar" />
      <Picker.Item label="Chettiyar" value="Chettiyar" />
      <Picker.Item label="COVER NADIU" value="COVER NADIU" />
      <Picker.Item label="DEVANGA" value="DEVANGA" />
      <Picker.Item label="DRIVIDAR" value="DRIVIDAR" />
      <Picker.Item label="Govunder" value="Govunder" />
      <Picker.Item label="KAMMALAR" value="KAMMALAR" />
      <Picker.Item label="KONGU VELLALAR" value="KONGU VELLALAR" />
      <Picker.Item label="KONGU VELLALAR GOUNDER" value="KONGU VELLALAR GOUNDER" />
      <Picker.Item label="KONGUCHITTIYER(MBC)" value="KONGUCHITTIYER" />
      <Picker.Item label="Kurmpa Gounder" value="Kurmpa Gounder" />
      <Picker.Item label="KURUMBA" value="KURUMBA" />
      <Picker.Item label="MARATTI" value="MARATTI" />
      <Picker.Item label="MARAVAR" value="MARAVAR" />
      <Picker.Item label="MBC" value="MBC" />
      <Picker.Item label="MUTHALIYAR" value="MUTHALIYAR" />
      <Picker.Item label="NADAR" value="NADAR" />
      <Picker.Item label="Nadar v" value="Nadar v" />
      <Picker.Item label="NAIDU" value="NAIDU" />
      <Picker.Item label="NAICKER" value="NAICKER" />
      <Picker.Item label="NAYAKKAR-BC" value="NAYAKKAR-BC" />
      <Picker.Item label="NAYAR" value="NAYAR" />
      <Picker.Item label="okkli GOWUDER" value="okkli GOWUDER" />
      <Picker.Item label="PALLAN" value="PALLAN" />
      <Picker.Item label="Pillai" value="Pillai" />
      <Picker.Item label="RAJAPUT BUNDIL" value="RAJAPUT BUNDIL" />
      <Picker.Item label="ravothor" value="ravothor" />
      <Picker.Item label="saivapillai" value="saivapillai" />
      <Picker.Item label="SC" value="SC" />
      <Picker.Item label="SENGUNTHA MUDHALIYAR" value="SENGUNTHA MUDHALIYAR" />
      <Picker.Item label="SRIVASTHUVAKAYASTHU" value="SRIVASTHUVAKAYASTHU" />
      <Picker.Item label="TELEGU CHETIAR" value="TELEGU CHETIAR" />
      <Picker.Item label="VADUGAN" value="VADUGAN" />
      <Picker.Item label="Vakkiliyar" value="Vakkiliyar" />
      <Picker.Item label="VANNIYER(MBC)" value="VANNIYER(MBC)" />
      <Picker.Item label="VELLALAR" value="VELLALAR" />
      <Picker.Item label="Viswagarma" value="Viswagarma" />
      <Picker.Item label="YADHAVAR" value="YADHAVAR" />
      <Picker.Item label="other Background" value="other Background" />
      <Picker.Item label="DEVAR" value="DEVAR" />
      <Picker.Item label="BRAHMIN" value="BRAHMIN" />
      <Picker.Item label="JANGAM" value="JANGAM" />
      <Picker.Item label="KANNADIYAR" value="KANNADIYAR" />
      <Picker.Item label="MARUTHOUR" value="MARUTHOUR" />
      <Picker.Item label="PRIMALAI KALLAR" value="PRIMALAI KALLAR" />
      <Picker.Item label="VANNAR" value="VANNAR" />
      <Picker.Item label="OBC" value="OBC" />
      <Picker.Item label="MANRADIYAR" value="MANRADIYAR" />
      <Picker.Item label="GENERAL" value="GENERAL" />
      <Picker.Item label="ADI ANDHRA" value="ADI ANDHRA" />
      <Picker.Item label="ADI DRAVIDA" value="ADI DRAVIDA" />
      <Picker.Item label="ADI KARNATAKA" value="ADI KARNATAKA" />
      <Picker.Item label="AJILA" value="AJILA" />
      <Picker.Item label="ARUNTHATHIYAR" value="ARUNTHATHIYAR" />
      <Picker.Item label="AYYANAVAR" value="AYYANAVAR" />
      <Picker.Item label="BAIRA" value="BAIRA" />
      <Picker.Item label="BAKUDA" value="BAKUDA" />
      <Picker.Item label="SANDI" value="SANDI" />
      <Picker.Item label="BELLARA" value="BELLARA" />
      <Picker.Item label="BHARATAR" value="BHARATAR" />
      <Picker.Item label="CHAKKILIYAN" value="CHAKKILIYAN" />
      <Picker.Item label="CHALAVADI" value="CHALAVADI" />
      <Picker.Item label="CHAMAR" value="CHAMAR" />
      <Picker.Item label="CHANDALA" value="CHANDALA" />
      <Picker.Item label="CHERUMAN" value="CHERUMAN" />
      <Picker.Item label="DEVENDRAKULATHAN" value="DEVENDRAKULATHAN" />
      <Picker.Item label="DOMBAN" value="DOMBAN" />
      <Picker.Item label="GODAGALI" value="GODAGALI" />
      <Picker.Item label="GODDA" value="GODDA" />
      <Picker.Item label="GOSANGI" value="GOSANGI" />
      <Picker.Item label="HOLEYA" value="HOLEYA" />
      <Picker.Item label="JAGGALI" value="JAGGALI" />
      <Picker.Item label="JAMBUVULU" value="JAMBUVULU" />
      <Picker.Item label="KADAIYAN" value="KADAIYAN" />
      <Picker.Item label="KAKKALAN" value="KAKKALAN" />
      <Picker.Item label="KALLADI" value="KALLADI" />
      <Picker.Item label="KANAKKAN" value="KANAKKAN" />
      <Picker.Item label="KARIMPALAN" value="KARIMPALAN" />
      <Picker.Item label="KAVARA" value="KAVARA" />
      <Picker.Item label="KOLIYAN" value="KOLIYAN" />
      <Picker.Item label="KOOSA" value="KOOSA" />
      <Picker.Item label="KOOTAN" value="KOOTAN" />
      <Picker.Item label="KUDUMBAN" value="KUDUMBAN" />
      <Picker.Item label="KURAVAN" value="KURAVAN" />
      <Picker.Item label="MADARI" value="MADARI" />
      <Picker.Item label="MADIGA" value="MADIGA" />
      <Picker.Item label="MAILA" value="MAILA" />
      <Picker.Item label="MALA" value="MALA" />
      <Picker.Item label="MANNAN" value="MANNAN" />
      <Picker.Item label="MAVILAN" value="MAVILAN" />
      <Picker.Item label="MOGER" value="MOGER" />
      <Picker.Item label="MUNDALA" value="MUNDALA" />
      <Picker.Item label="NALAKEYAVA" value="NALAKEYAVA" />
      <Picker.Item label="NAYADI" value="NAYADI" />
      <Picker.Item label="PADANNAN" value="PADANNAN" />
      <Picker.Item label="PAGADAI" value="PAGADAI" />
      <Picker.Item label="PALLUVAN" value="PALLUVAN" />
      <Picker.Item label="PAMBADA" value="PAMBADA" />
      <Picker.Item label="PANAN" value="PANAN" />
      <Picker.Item label="PANCHAMA" value="PANCHAMA" />
      <Picker.Item label="PANNADI" value="PANNADI" />
      <Picker.Item label="PANNIANDI" value="PANNIANDI" />
      <Picker.Item label="PARAI YAN" value="PARAI YAN" />
      <Picker.Item label="PARAVAN" value="PARAVAN" />
      <Picker.Item label="PATHIYAN" value="PATHIYAN" />
      <Picker.Item label="PULAYAN" value="PULAYAN" />
      <Picker.Item label="PUTHIRAI VANNAN" value="PUTHIRAI VANNAN" />
      <Picker.Item label="RANEYAR" value="RANEYAR" />
      <Picker.Item label="SAMBAN" value="SAMBAN" />
      <Picker.Item label="SAPARI" value="SAPARI" />
      <Picker.Item label="SEMMAN" value="SEMMAN" />
      <Picker.Item label="THANDAN" value="THANDAN" />
      <Picker.Item label="THOTI" value="THOTI" />
      <Picker.Item label="TIRUVALLUVAR" value="TIRUVALLUVAR" />
      <Picker.Item label="VALLON" value="VALLON" />
      <Picker.Item label="VALLUVAN" value="VALLUVAN" />
      <Picker.Item label="VANNAN" value="VANNAN" />
      <Picker.Item label="VATHIRIYAN" value="VATHIRIYAN" />
      <Picker.Item label="VELAN" value="VELAN" />
      <Picker.Item label="VETAN" value="VETAN" />
      <Picker.Item label="VETTIYAN" value="VETTIYAN" />
      <Picker.Item label="VETTUVAN" value="VETTUVAN" />
      <Picker.Item label="ADIYAN" value="ADIYAN" />
      <Picker.Item label="ARANADAN" value="ARANADAN" />
      <Picker.Item label="ERAVALLAN" value="ERAVALLAN" />
      <Picker.Item label="IRULAR" value="IRULAR" />
      <Picker.Item label="KADAR" value="KADAR" />
      <Picker.Item label="KAMMARA" value="KAMMARA" />
      <Picker.Item label="KANIKARAN" value="KANIKARAN" />
      <Picker.Item label="KANIKKAR" value="KANIKKAR" />
      <Picker.Item label="KANIYAN" value="KANIYAN" />
      <Picker.Item label="KATTUNAYAKAN" value="KATTUNAYAKAN" />
      <Picker.Item label="KOCHU VELAN" value="KOCHU VELAN" />
      <Picker.Item label="KONDA KAPUS" value="KONDA KAPUS" />
      <Picker.Item label="KONDAREDDIS" value="KONDAREDDIS" />
      <Picker.Item label="KORAGA" value="KORAGA" />
      <Picker.Item label="KOTA" value="KOTA" />
      <Picker.Item label="KUDIYA" value="KUDIYA" />
      <Picker.Item label="KURICHCHAN" value="KURICHCHAN" />
      <Picker.Item label="KURUMBAS" value="KURUMBAS" />
      <Picker.Item label="KURUMANS" value="KURUMANS" />
      <Picker.Item label="MAHA MALASAR" value="MAHA MALASAR" />
      <Picker.Item label="MALAI ARAYAN" value="MALAI ARAYAN" />
      <Picker.Item label="MALAI PANDARAM" value="MALAI PANDARAM" />
      <Picker.Item label="MALAI VEDAN" value="MALAI VEDAN" />
      <Picker.Item label="MALAKKURAVAN" value="MALAKKURAVAN" />
      <Picker.Item label="MALASAR" value="MALASAR" />
      <Picker.Item label="MALAYALI" value="MALAYALI" />
      <Picker.Item label="MALAYEKANDI" value="MALAYEKANDI" />
      <Picker.Item label="MUDUGAR" value="MUDUGAR" />
      <Picker.Item label="MUTHUVAN" value="MUTHUVAN" />
      <Picker.Item label="PALLEYAN" value="PALLEYAN" />
      <Picker.Item label="PALLIYAN" value="PALLIYAN" />
      <Picker.Item label="PALLIYAR" value="PALLIYAR" />
      <Picker.Item label="PANIYAN" value="PANIYAN" />
      <Picker.Item label="SHOLAGA" value="SHOLAGA" />
      <Picker.Item label="TODA" value="TODA" />
      <Picker.Item label="URALY" value="URALY" />
      <Picker.Item label="SERVAI" value="SERVAI" />
      <Picker.Item label="AGARAM VELLAN CHETTIAR" value="AGARAM VELLAN CHETTIAR" />
      <Picker.Item label="ALWAR" value="ALWAR" />
      <Picker.Item label="AZHAVAR" value="AZHAVAR" />
      <Picker.Item label="ALAVAR" value="ALAVAR" />
      <Picker.Item label="NULAYAR" value="NULAYAR" />
      <Picker.Item label="ARCHAKARAI VELLALA" value="ARCHAKARAI VELLALA" />
      <Picker.Item label="ARYAVATHI" value="ARYAVATHI" />
      <Picker.Item label="AYIRA VAISYAR" value="AYIRA VAISYAR" />
      <Picker.Item label="ENADI" value="ENADI" />
      <Picker.Item label="EZHAVATHY" value="EZHAVATHY" />
      <Picker.Item label="EZHUTHACHAR" value="EZHUTHACHAR" />
      <Picker.Item label="EZHUVA" value="EZHUVA" />
      <Picker.Item label="GANGAVAR" value="GANGAVAR" />
      <Picker.Item label="GAVARA" value="GAVARA" />
      <Picker.Item label="GAVARAI" value="GAVARAI" />
      <Picker.Item label="VADUGAR" value="VADUGAR" />
      <Picker.Item label="KAMMA" value="KAMMA" />
      <Picker.Item label="KAPU" value="KAPU" />
      <Picker.Item label="BALIJA" value="BALIJA" />
      <Picker.Item label="GOUNDER" value="GOUNDER" />
      <Picker.Item label="GOWDA" value="GOWDA" />
      <Picker.Item label="HEGDE" value="HEGDE" />
      <Picker.Item label="JHETTY" value="JHETTY" />
      <Picker.Item label="JOGIS" value="JOGIS" />
      <Picker.Item label="KABBERA" value="KABBERA" />
      <Picker.Item label="KAIKOLAR" value="KAIKOLAR" />
      <Picker.Item label="KALLAR" value="KALLAR" />
      <Picker.Item label="EASANATTU KALLAR" value="EASANATTU KALLAR" />
      <Picker.Item label="GANDHARVAKOTTAI KALLARS" value="GANDHARVAKOTTAI KALLARS" />
      <Picker.Item label="KALLAR KULA THONDAMAN" value="KALLAR KULA THONDAMAN" />
      <Picker.Item label="KALVELI GOUNDER" value="KALVELI GOUNDER" />
      <Picker.Item label="KAMBAR" value="KAMBAR" />
      <Picker.Item label="VELLAN CHETTIAR" value="VELLAN CHETTIAR" />
      <Picker.Item label="YAVANA" value="YAVANA" />
      <Picker.Item label="SHEIK" value="SHEIK" />
      <Picker.Item label="ANSAR" value="ANSAR" />
      <Picker.Item label="DEKKANI MUSLIMS" value="DEKKANI MUSLIMS" />
      <Picker.Item label="DUDEKULA" value="DUDEKULA" />
      <Picker.Item label="LABBAIS" value="LABBAIS" />
      <Picker.Item label="ROWTHAR" value="ROWTHAR" />
      <Picker.Item label="MARAKAYAR" value="MARAKAYAR" />
      <Picker.Item label="MAPILLA" value="MAPILLA" />
      <Picker.Item label="SYED" value="SYED" />
      <Picker.Item label="OTHERS" value="OTHERS" />
      <Picker.Item label="NADAR" value="NADAR" />
    </Picker>
  );
};

export default CastePicker;
