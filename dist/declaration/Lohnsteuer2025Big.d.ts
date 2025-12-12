import Big from 'big.js';
import { TaxJs, TaxJsValueType, TaxJsDictionary } from '../../TaxJs';
type Lohnsteuer2025InBigType = "JFREIB" | "JHINZU" | "JRE4" | "JRE4ENT" | "JVBEZ" | "KVZ" | "LZZFREIB" | "LZZHINZU" | "MBV" | "PKPV" | "PVA" | "RE4" | "SONSTB" | "SONSTENT" | "STERBE" | "VBEZ" | "VBEZM" | "VBEZS" | "VBS" | "ZKF";
type Lohnsteuer2025InNumberType = "af" | "AJAHR" | "ALTER1" | "f" | "KRV" | "LZZ" | "PKV" | "PVS" | "PVZ" | "R" | "STKL" | "VJAHR" | "ZMVB";
type Lohnsteuer2025OutType = "BK" | "BKS" | "LSTLZZ" | "SOLZLZZ" | "SOLZS" | "STS" | "VKVLZZ" | "VKVSONST" | "VFRB" | "VFRBS1" | "VFRBS2" | "WVFRB" | "WVFRBO" | "WVFRBM";
/**
* Steuerberechnungsklasse.
*
* Generiert aus Pseudocode von: <a href="https://www.bmf-steuerrechner.de">bmf-steuerrechner</a>
*
*/
export declare class Lohnsteuer2025 implements TaxJs<Lohnsteuer2025InBigType, Lohnsteuer2025InNumberType, Lohnsteuer2025OutType> {
    private static readonly _n;
    private static readonly _b;
    private static readonly _i;
    private static readonly _o;
    private static readonly _s;
    private static readonly _d;
    private readonly Z_0;
    private readonly Z_1;
    private readonly Z_10;
    /**  Stand: 2025-09-17 13:05 */
    /**  ITZBund Berlin  */
    /**   EINGABEPARAMETER   */
    /**  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)  */
    private af;
    /**  Auf die Vollendung des 64. Lebensjahres folgende
         Kalenderjahr (erforderlich, wenn ALTER1=1)  */
    private AJAHR;
    /**  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
         der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0  */
    private ALTER1;
    /**  eingetragener Faktor mit drei Nachkommastellen  */
    private f;
    /**  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
         sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
         elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
         auf der Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)  */
    private JFREIB;
    /**  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
         sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
         elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
         Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)  */
    private JHINZU;
    /**  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
         die zu besteuernden Vorteile bei Vermögensbeteiligungen,
         § 19a Absatz 4 EStG) in Cent.
         Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
         Bezügen (Feld SONSTB).
         Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
         so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
         besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).  */
    private JRE4;
    /**  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
         Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent  */
    private JRE4ENT;
    /**  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)  */
    private JVBEZ;
    /** Merker für die Vorsorgepauschale
        0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
        berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
        Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
        
        1 = wenn nicht 0
          */
    private KRV;
    /**  Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
     in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
     Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
     anteil erfolgt im Programmablauf.  */
    private KVZ;
    /**  Lohnzahlungszeitraum:
         1 = Jahr
         2 = Monat
         3 = Woche
         4 = Tag  */
    private LZZ;
    /**  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
         oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Freibetrag für den
         Lohnzahlungszeitraum in Cent  */
    private LZZFREIB;
    /**  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
         oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Hinzurechnungsbetrag für den
         Lohnzahlungszeitraum in Cent  */
    private LZZHINZU;
    /**  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
         (§ 19a Absatz 1 Satz 4 EStG) in Cent  */
    private MBV;
    /**  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
         Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
         als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
         als Monatsbetrag anzugeben). */
    private PKPV;
    /**  Krankenversicherung:
         0 = gesetzlich krankenversicherte Arbeitnehmer
         1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
         2 = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss  */
    private PKV;
    /**  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
         bei mehr als einem Kind
         0 = kein Abschlag
         1 = Beitragsabschlag für das 2. Kind
         2 = Beitragsabschläge für das 2. und 3. Kind
         3 = Beitragsabschläge für 2. bis 4. Kinder
         4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder    */
    private PVA;
    /**  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
            zu berücksichtigen wären  */
    private PVS;
    /**  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
            zu zahlen hat  */
    private PVZ;
    /**  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
         Bescheinigung für den Lohnsteuerabzug 2025 (bei keiner Religionszugehörigkeit = 0)  */
    private R;
    /**  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
         Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
         und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
         den Lohnsteuerabzug 2025 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
         Hinzurechnungsbetrags in Cent  */
    private RE4;
    /**  Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
         Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)  */
    private SONSTB;
    /**  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
         Absatz 4 EStG), in Cent  */
    private SONSTENT;
    /**  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen
          (in SONSTB enthalten), in Cent  */
    private STERBE;
    /**  Steuerklasse:
         1 = I
         2 = II
         3 = III
         4 = IV
         5 = V
         6 = VI  */
    private STKL;
    /**  In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach
         § 19 Absatz 2 Satz 10 und 11 EStG  */
    private VBEZ;
    /**  Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt
         wurde, in Cent  */
    private VBEZM;
    /**  Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
         Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
         ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
     */
    private VBEZS;
    /**  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
        in Cents (ggf. 0)  */
    private VBS;
    /**  Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
         werden mehrere Versorgungsbezüge gezahlt, wird aus
         Vereinfachungsgründen für die Berechnung das Jahr des ältesten
         erstmaligen Bezugs herangezogen; auf die Möglichkeit der
         getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
         EStG) wird im Übrigen verwiesen  */
    private VJAHR;
    /**  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
         I, II, III und IV)  */
    private ZKF;
    /**  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden [nur
         erforderlich bei Jahresberechnung (LZZ = 1)]  */
    private ZMVB;
    /**   AUSGABEPARAMETER   */
    /**  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents  */
    private BK;
    /**  Bemessungsgrundlage der sonstigen Bezüge  für die Kirchenlohnsteuer in Cent.
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
         Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
         (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
         im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private BKS;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents  */
    private LSTLZZ;
    /**  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
         in Cents  */
    private SOLZLZZ;
    /**  Solidaritätszuschlag für sonstige Bezüge in Cent.
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
         Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
         mindern SOLZLZZ (maximal bis 0). Der Sonderausgabenabzug für
         tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
         Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private SOLZS;
    /**  Lohnsteuer für sonstige Bezüge in Cent
         Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
         (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
         Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
         Veranlagung zur Einkommensteuer bleibt unberührt.  */
    private STS;
    /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
         privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
         die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
         steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
         steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
         VKVSONST  */
    private VKVLZZ;
    /**  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
         zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
         auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
         auch negativ sein.  */
    private VKVSONST;
    /**   AUSGABEPARAMETER DBA   */
    /**  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent  */
    private VFRB;
    /**  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
    private VFRBS1;
    /**  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent  */
    private VFRBS2;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
        dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent  */
    private WVFRB;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
        bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent  */
    private WVFRBO;
    /**  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
        über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent  */
    private WVFRBM;
    /**   INTERNE FELDER   */
    /**  Altersentlastungsbetrag nach Alterseinkünftegesetz in Euro,
         Cent (2 Dezimalstellen)  */
    private ALTE;
    /**  Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro  */
    private ANP;
    /**  Auf den Lohnzahlungszeitraum entfallender Anteil von Jahreswerten
         auf ganze Cents abgerundet  */
    private ANTEIL1;
    /**  Beitragsbemessungsgrenze in der gesetzlichen Krankenversicherung
         und der sozialen Pflegeversicherung in Euro  */
    private BBGKVPV;
    /**  Allgemeine Beitragsbemessungsgrenze in der allgemeinen Rentenversicherung in Euro  */
    private BBGRV;
    /**  Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent
         (2 Dezimalstellen)  */
    private BMG;
    /**  Differenz zwischen ST1 und ST2 in Euro  */
    private DIFF;
    /**  Entlastungsbetrag für Alleinerziehende in Euro  */
    private EFA;
    /**  Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)  */
    private FVB;
    /**  Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die Berechnung
         der Lohnsteuer beim sonstigen Bezug  */
    private FVBSO;
    /**  Zuschlag zum Versorgungsfreibetrag in Euro  */
    private FVBZ;
    /**  Zuschlag zum Versorgungsfreibetrag in Euro fuer die Berechnung
         der Lohnsteuer beim sonstigen Bezug  */
    private FVBZSO;
    /**  Grundfreibetrag in Euro  */
    private GFB;
    /**  Maximaler Altersentlastungsbetrag in Euro  */
    private HBALTE;
    /**  Maßgeblicher maximaler Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)  */
    private HFVB;
    /**  Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent
         (2 Dezimalstellen)  */
    private HFVBZ;
    /**  Maßgeblicher maximaler Zuschlag zum Versorgungsfreibetrag in Euro, Cent
         (2 Dezimalstellen) für die Berechnung der Lohnsteuer beim
         sonstigen Bezug  */
    private HFVBZSO;
    /**  Zwischenfeld zu X fuer die Berechnung der Steuer nach § 39b
         Abs. 2 Satz 7 EStG in Euro  */
    private HOCH;
    /**  Nummer der Tabellenwerte fuer Versorgungsparameter  */
    private J;
    /**  Jahressteuer nach § 51a EStG, aus der Solidaritaetszuschlag und
         Bemessungsgrundlage fuer die Kirchenlohnsteuer ermittelt werden in Euro  */
    private JBMG;
    /**  Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent
         (2 Dezimalstellen)  */
    private JLFREIB;
    /**  Auf einen Jahreslohn hochgerechnete LZZHINZU in Euro, Cent
         (2 Dezimalstellen)  */
    private JLHINZU;
    /**  Jahreswert, dessen Anteil fuer einen Lohnzahlungszeitraum in
         UPANTEIL errechnet werden soll in Cents  */
    private JW;
    /**  Nummer der Tabellenwerte fuer Parameter bei Altersentlastungsbetrag  */
    private K;
    /**  Summe der Freibeträge fuer Kinder in Euro  */
    private KFB;
    /**  Beitragssatz des Arbeitgebers zur Krankenversicherung unter
         Berücksichtigung des durchschnittlichen Zusatzbeitragssatzes für die
         Ermittlung des Arbeitgeberzuschusses (5 Dezimalstellen)  */
    private KVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Krankenversicherung
         (5 Dezimalstellen)  */
    private KVSATZAN;
    /**  Kennzahl fuer die Einkommensteuer-Tabellenart:
          1 = Grundtarif
          2 = Splittingverfahren  */
    private KZTAB;
    /**  Jahreslohnsteuer in Euro  */
    private LSTJAHR;
    /**  Zwischenfelder der Jahreslohnsteuer in Cent  */
    private LSTOSO;
    private LSTSO;
    /**  Mindeststeuer fuer die Steuerklassen V und VI in Euro  */
    private MIST;
    /**  Beitragssatz des Arbeitgebers zur Pflegeversicherung (6 Dezimalstellen) */
    private PVSATZAG;
    /**  Beitragssatz des Arbeitnehmers zur Pflegeversicherung (6 Dezimalstellen) */
    private PVSATZAN;
    /**  Beitragssatz des Arbeitnehmers in der allgemeinen gesetzlichen Rentenversicherung (4 Dezimalstellen)   */
    private RVSATZAN;
    /**  Rechenwert in Gleitkommadarstellung  */
    private RW;
    /**  Sonderausgaben-Pauschbetrag in Euro  */
    private SAP;
    /**  Freigrenze fuer den Solidaritaetszuschlag in Euro  */
    private SOLZFREI;
    /**  Solidaritaetszuschlag auf die Jahreslohnsteuer in Euro, Cent (2 Dezimalstellen)  */
    private SOLZJ;
    /**  Zwischenwert fuer den Solidaritaetszuschlag auf die Jahreslohnsteuer
         in Euro, Cent (2 Dezimalstellen)  */
    private SOLZMIN;
    /**  Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro  */
    private SOLZSBMG;
    /**  Zu versteuerndes Einkommen für die Ermittlung der
         Bemessungsgrundlage des Solidaritätszuschlags zur Prüfung der
         Freigrenze beim Solidaritätszuschlag für sonstige Bezüge in Euro,
         Cent (2 Dezimalstellen)  */
    private SOLZSZVE;
    /**  Bemessungsgrundlage des Solidaritätszuschlags für die Prüfung der Freigrenze beim Solidaritätszuschlag für die Vergütung für mehrjährige Tätigkeit in Euro  */
    private SOLZVBMG;
    /**  Tarifliche Einkommensteuer in Euro  */
    private ST;
    /**  Tarifliche Einkommensteuer auf das 1,25-fache ZX in Euro  */
    private ST1;
    /**  Tarifliche Einkommensteuer auf das 0,75-fache ZX in Euro  */
    private ST2;
    /**  Bemessungsgrundlage fuer den Versorgungsfreibetrag in Cent  */
    private VBEZB;
    /**  Bemessungsgrundlage für den Versorgungsfreibetrag in Cent für
         den sonstigen Bezug  */
    private VBEZBSO;
    /**  Zwischenfeld zu X fuer die Berechnung der Steuer nach § 39b
        Abs. 2 Satz 7 EStG in Euro  */
    private VERGL;
    /**  Höchstbetrag der Mindestvorsorgepauschale für die Kranken- und
         Pflegeversicherung in Euro, Cent (2 Dezimalstellen) */
    private VHB;
    /**  Jahreswert der berücksichtigten Beiträge zur privaten Basis-Krankenversicherung und
          privaten Pflege-Pflichtversicherung (ggf. auch die Mindestvorsorgepauschale) in Cent.  */
    private VKV;
    /**  Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung
         sowie die gesetzliche Kranken- und soziale Pflegeversicherung nach
         fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung
         und private Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)  */
    private VSP;
    /**  Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung
         sowie der Mindestvorsorgepauschale für die Kranken- und
         Pflegeversicherung in Euro, Cent (2 Dezimalstellen) */
    private VSPN;
    /**  Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Euro,
         Cent (2 Dezimalstellen)  */
    private VSP1;
    /**  Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Euro,
         Cent (2 Dezimalstellen)  */
    private VSP2;
    /**  Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken-
         und soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für
         die private Basiskrankenversicherung und private Pflege-
         Pflichtversicherung in Euro, Cent (2 Dezimalstellen)  */
    private VSP3;
    /**  Erster Grenzwert in Steuerklasse V/VI in Euro  */
    private W1STKL5;
    /**  Zweiter Grenzwert in Steuerklasse V/VI in Euro  */
    private W2STKL5;
    /**  Dritter Grenzwert in Steuerklasse V/VI in Euro  */
    private W3STKL5;
    /**  Zu versteuerndes Einkommen gem. § 32a Abs. 1 und 2 EStG Euro, Cent
         (2 Dezimalstellen)  */
    private X;
    /**  Gem. § 32a Abs. 1 EStG (6 Dezimalstellen)  */
    private Y;
    /**  Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
         nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG  */
    private ZRE4;
    /**  Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)  */
    private ZRE4J;
    /**  Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
         Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent
         (2 Dezimalstellen)  */
    private ZRE4VP;
    /**  Feste Tabellenfreibeträge (ohne Vorsorgepauschale) in Euro, Cent
         (2 Dezimalstellen)  */
    private ZTABFB;
    /**  Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in
         Euro, Cent (2 Dezimalstellen)  */
    private ZVBEZ;
    /**  Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)  */
    private ZVBEZJ;
    /**  Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)  */
    private ZVE;
    /**  Zwischenfeld zu X fuer die Berechnung der Steuer nach § 39b
         Abs. 2 Satz 7 EStG in Euro  */
    private ZX;
    /**  Zwischenfeld zu X fuer die Berechnung der Steuer nach § 39b
         Abs. 2 Satz 7 EStG in Euro  */
    private ZZX;
    /**  Tabelle für die Prozentsätze des Versorgungsfreibetrags  */
    /**  geändert für 2025  */
    private readonly TAB1;
    /**  Tabelle für die Höchstbeträge des Versorgungsfreibetrags  */
    /**  geändert für 2025  */
    private readonly TAB2;
    /**  Tabelle für die Zuschläge zum Versorgungsfreibetrag  */
    /**  geändert für 2025  */
    private readonly TAB3;
    /**  Tabelle für die Höchstbeträge des Altersentlastungsbetrags  */
    /**  geändert für 2025  */
    private readonly TAB4;
    /**  Tabelle fuer die Hoechstbetraege des Altersentlastungsbetrags  */
    /**  geändert für 2025  */
    private readonly TAB5;
    /**  Zahlenkonstanten fuer im Plan oft genutzte BigDecimal Werte  */
    private readonly ZAHL1;
    private readonly ZAHL2;
    private readonly ZAHL5;
    private readonly ZAHL7;
    private readonly ZAHL12;
    private readonly ZAHL100;
    private readonly ZAHL360;
    private readonly ZAHL500;
    private readonly ZAHL700;
    private readonly ZAHL1000;
    private readonly ZAHL10000;
    /**  PROGRAMMABLAUFPLAN, PAP Seite 13  */
    calculate(): void;
    /**  Zuweisung von Werten für bestimmte Sozialversicherungsparameter  PAP Seite 14  */
    private MPARA;
    /**  Ermittlung des Jahresarbeitslohns nach § 39 b Abs. 2 Satz 2 EStG, PAP Seite 15  */
    private MRE4JL;
    /**  Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 16  */
    private MRE4;
    /**  Altersentlastungsbetrag (§ 39b Abs. 2 Satz 3 EStG), PAP Seite 17  */
    private MRE4ALTE;
    /**  Ermittlung des Jahresarbeitslohns nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4 EStG, PAP Seite 20  */
    private MRE4ABZ;
    /**  Berechnung fuer laufende Lohnzahlungszeitraueme Seite 21 */
    private MBERECH;
    /**  Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale), PAP Seite 22  */
    private MZTABFB;
    /**  Ermittlung Jahreslohnsteuer, PAP Seite 23  */
    private MLSTJAHR;
    /**  PAP Seite 24  */
    private UPVKVLZZ;
    /**  PAP Seite 24  */
    private UPVKV;
    /**  PAP Seite 25  */
    private UPLSTLZZ;
    /**  Ermittlung der Jahreslohnsteuer aus dem Einkommensteuertarif. PAP Seite 26  */
    private UPMLST;
    /**  	Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG) PAP Seite 27   */
    private UPEVP;
    /**  Vorsorgepauschale (§39b Abs. 2 Satz 5 Nr 3 EStG) Vergleichsberechnung fuer Guenstigerpruefung, PAP Seite 28  */
    private MVSP;
    /**  Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 29  */
    private MST5_6;
    /**  Unterprogramm zur Lohnsteuer fuer die Steuerklassen V und VI (§ 39b Abs. 2 Satz 7 EStG), PAP Seite 30  */
    private UP5_6;
    /**  Solidaritaetszuschlag, PAP Seite 31  */
    private MSOLZ;
    /**  Anteil von Jahresbetraegen fuer einen LZZ (§ 39b Abs. 2 Satz 9 EStG), PAP Seite 32  */
    private UPANTEIL;
    /**  Berechnung sonstiger Bezuege nach § 39b Abs. 3 Saetze 1 bis 8 EStG), PAP Seite 33  */
    private MSONST;
    /**  PAP Seite 34  */
    private STSMIN;
    /**  Berechnung des SolZ auf sonstige Bezüge, PAP Seite 35  */
    private MSOLZSTS;
    /**  Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 36  */
    private MOSONST;
    /**  Sonderberechnung mit sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit, PAP Seite 37  */
    private MRE4SONST;
    /**  Tarifliche Einkommensteuer §32a EStG, PAP Seite 38  */
    private UPTAB25;
    /**
     * Getter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @return the value
     */
    getAf(): number;
    /**
     * Setter for af.
     * <p>
     *  1, wenn die Anwendung des Faktorverfahrens gewählt wurden (nur in Steuerklasse IV)
     * <p>
     * @param {number} af input value
     */
    setAf(af: number): void;
    /**
     * Getter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @return the value
     */
    getAJAHR(): number;
    /**
     * Setter for AJAHR.
     * <p>
     *  Auf die Vollendung des 64. Lebensjahres folgende
                 Kalenderjahr (erforderlich, wenn ALTER1=1)
     * <p>
     * @param {number} AJAHR input value
     */
    setAJAHR(AJAHR: number): void;
    /**
     * Getter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @return the value
     */
    getALTER1(): number;
    /**
     * Setter for ALTER1.
     * <p>
     *  1, wenn das 64. Lebensjahr zu Beginn des Kalenderjahres vollendet wurde, in dem
                 der Lohnzahlungszeitraum endet (§ 24 a EStG), sonst = 0
     * <p>
     * @param {number} ALTER1 input value
     */
    setALTER1(ALTER1: number): void;
    /**
     * Getter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @return the value
     */
    getF(): number;
    /**
     * Setter for f.
     * <p>
     *  eingetragener Faktor mit drei Nachkommastellen
     * <p>
     * @param {number} f input value
     */
    setF(f: number): void;
    /**
     * Getter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getJFREIB(): Big;
    /**
     * Setter for JFREIB.
     * <p>
     *  Jahresfreibetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung
                 auf der Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)
     * <p>
     * @param {Big} JFREIB input value
     */
    setJFREIB(JFREIB: Big): void;
    /**
     * Getter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getJHINZU(): Big;
    /**
     * Setter for JHINZU.
     * <p>
     *  Jahreshinzurechnungsbetrag für die Ermittlung der Lohnsteuer für die sonstigen Bezüge
                 sowie für Vermögensbeteiligungen nach § 19a Absatz 1 und 4 EStG nach Maßgabe der
                 elektronischen Lohnsteuerabzugsmerkmale nach § 39e EStG oder der Eintragung auf der
                 Bescheinigung für den Lohnsteuerabzug 2025 in Cent (ggf. 0)
     * <p>
     * @param {Big} JHINZU input value
     */
    setJHINZU(JHINZU: Big): void;
    /**
     * Getter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
                 die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                 § 19a Absatz 4 EStG) in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                 Bezügen (Feld SONSTB).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                 so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                 besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).
     * <p>
     * @return the value
     */
    getJRE4(): Big;
    /**
     * Setter for JRE4.
     * <p>
     *  Voraussichtlicher Jahresarbeitslohn ohne sonstige Bezüge (d.h. auch ohne
                 die zu besteuernden Vorteile bei Vermögensbeteiligungen,
                 § 19a Absatz 4 EStG) in Cent.
                 Anmerkung: Die Eingabe dieses Feldes (ggf. 0) ist erforderlich bei Eingaben zu sonstigen
                 Bezügen (Feld SONSTB).
                 Sind in einem vorangegangenen Abrechnungszeitraum bereits sonstige Bezüge gezahlt worden,
                 so sind sie dem voraussichtlichen Jahresarbeitslohn hinzuzurechnen. Gleiches gilt für zu
                 besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG).
     * <p>
     * @param {Big} JRE4 input value
     */
    setJRE4(JRE4: Big): void;
    /**
     * Getter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @return the value
     */
    getJRE4ENT(): Big;
    /**
     * Setter for JRE4ENT.
     * <p>
     *  In JRE4 enthaltene Entschädigungen nach § 24 Nummer 1 EStG und zu besteuernde
                 Vorteile bei Vermögensbeteiligungen (§ 19a Absatz 4 EStG in Cent
     * <p>
     * @param {Big} JRE4ENT input value
     */
    setJRE4ENT(JRE4ENT: Big): void;
    /**
     * Getter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getJVBEZ(): Big;
    /**
     * Setter for JVBEZ.
     * <p>
     *  In JRE4 enthaltene Versorgungsbezuege in Cents (ggf. 0)
     * <p>
     * @param {Big} JVBEZ input value
     */
    setJVBEZ(JVBEZ: Big): void;
    /**
     * Getter for KRV.
     * <p>
     * Merker für die Vorsorgepauschale
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
                berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
                Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
                
                1 = wenn nicht 0
                 
     * <p>
     * @return the value
     */
    getKRV(): number;
    /**
     * Setter for KRV.
     * <p>
     * Merker für die Vorsorgepauschale
                0 = der Arbeitnehmer ist in der gesetzlichen Rentenversicherung oder einer
                berufsständischen Versorgungseinrichtung pflichtversichert oder bei Befreiung von der
                Versicherungspflicht freiwillig versichert; es gilt die allgemeine Beitragsbemessungsgrenze
                
                1 = wenn nicht 0
                 
     * <p>
     * @param {number} KRV input value
     */
    setKRV(KRV: number): void;
    /**
     * Getter for KVZ.
     * <p>
     *  Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
             in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
             Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
             anteil erfolgt im Programmablauf.
     * <p>
     * @return the value
     */
    getKVZ(): Big;
    /**
     * Setter for KVZ.
     * <p>
     *  Kassenindividueller Zusatzbeitragssatz bei einem gesetzlich krankenversicherten Arbeitnehmer
             in Prozent (bspw. 2,50 für 2,50 %) mit 2 Dezimalstellen.
             Es ist der volle Zusatzbeitragssatz anzugeben. Die Aufteilung in Arbeitnehmer- und Arbeitgeber-
             anteil erfolgt im Programmablauf.
     * <p>
     * @param {Big} KVZ input value
     */
    setKVZ(KVZ: Big): void;
    /**
     * Getter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
     * <p>
     * @return the value
     */
    getLZZ(): number;
    /**
     * Setter for LZZ.
     * <p>
     *  Lohnzahlungszeitraum:
                 1 = Jahr
                 2 = Monat
                 3 = Woche
                 4 = Tag
     * <p>
     * @param {number} LZZ input value
     */
    setLZZ(LZZ: number): void;
    /**
     * Getter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZFREIB(): Big;
    /**
     * Setter for LZZFREIB.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Freibetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZFREIB input value
     */
    setLZZFREIB(LZZFREIB: Big): void;
    /**
     * Getter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @return the value
     */
    getLZZHINZU(): Big;
    /**
     * Setter for LZZHINZU.
     * <p>
     *  Der als elektronisches Lohnsteuerabzugsmerkmal für den Arbeitgeber nach § 39e EStG festgestellte
                 oder in der Bescheinigung für den Lohnsteuerabzug 2025 eingetragene Hinzurechnungsbetrag für den
                 Lohnzahlungszeitraum in Cent
     * <p>
     * @param {Big} LZZHINZU input value
     */
    setLZZHINZU(LZZHINZU: Big): void;
    /**
     * Getter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @return the value
     */
    getMBV(): Big;
    /**
     * Setter for MBV.
     * <p>
     *  Nicht zu besteuernde Vorteile bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) in Cent
     * <p>
     * @param {Big} MBV input value
     */
    setMBV(MBV: Big): void;
    /**
     * Getter for PKPV.
     * <p>
     *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
     * <p>
     * @return the value
     */
    getPKPV(): Big;
    /**
     * Setter for PKPV.
     * <p>
     *  Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
                 Kranken- bzw. Pflegeversicherung im Sinne des §10 Abs. 1 Nr. 3 EStG 2010
                 als Monatsbetrag in Cent (der Wert ist inabhängig vom Lohnzahlungszeitraum immer
                 als Monatsbetrag anzugeben).
     * <p>
     * @param {Big} PKPV input value
     */
    setPKPV(PKPV: Big): void;
    /**
     * Getter for PKV.
     * <p>
     *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss
     * <p>
     * @return the value
     */
    getPKV(): number;
    /**
     * Setter for PKV.
     * <p>
     *  Krankenversicherung:
                 0 = gesetzlich krankenversicherte Arbeitnehmer
                 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
                 2 = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss
     * <p>
     * @param {number} PKV input value
     */
    setPKV(PKV: number): void;
    /**
     * Getter for PVA.
     * <p>
     *  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                 bei mehr als einem Kind
                 0 = kein Abschlag
                 1 = Beitragsabschlag für das 2. Kind
                 2 = Beitragsabschläge für das 2. und 3. Kind
                 3 = Beitragsabschläge für 2. bis 4. Kinder
                 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
     * <p>
     * @return the value
     */
    getPVA(): Big;
    /**
     * Setter for PVA.
     * <p>
     *  Zahl der beim Arbeitnehmer zu berücksichtigenden Beitragsabschläge in der sozialen Pflegeversicherung
                 bei mehr als einem Kind
                 0 = kein Abschlag
                 1 = Beitragsabschlag für das 2. Kind
                 2 = Beitragsabschläge für das 2. und 3. Kind
                 3 = Beitragsabschläge für 2. bis 4. Kinder
                 4 = Beitragsabschläge für 2. bis 5. oder mehr Kinder
     * <p>
     * @param {Big} PVA input value
     */
    setPVA(PVA: Big): void;
    /**
     * Getter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären
     * <p>
     * @return the value
     */
    getPVS(): number;
    /**
     * Setter for PVS.
     * <p>
     *  1, wenn bei der sozialen Pflegeversicherung die Besonderheiten in Sachsen zu berücksichtigen sind bzw.
                    zu berücksichtigen wären
     * <p>
     * @param {number} PVS input value
     */
    setPVS(PVS: number): void;
    /**
     * Getter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat
     * <p>
     * @return the value
     */
    getPVZ(): number;
    /**
     * Setter for PVZ.
     * <p>
     *  1, wenn er der Arbeitnehmer den Zuschlag zur sozialen Pflegeversicherung
                    zu zahlen hat
     * <p>
     * @param {number} PVZ input value
     */
    setPVZ(PVZ: number): void;
    /**
     * Getter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2025 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @return the value
     */
    getR(): number;
    /**
     * Setter for R.
     * <p>
     *  Religionsgemeinschaft des Arbeitnehmers lt. elektronischer Lohnsteuerabzugsmerkmale oder der
                 Bescheinigung für den Lohnsteuerabzug 2025 (bei keiner Religionszugehörigkeit = 0)
     * <p>
     * @param {number} R input value
     */
    setR(R: number): void;
    /**
     * Getter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2025 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @return the value
     */
    getRE4(): Big;
    /**
     * Setter for RE4.
     * <p>
     *  Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor Berücksichtigung des
                 Versorgungsfreibetrags und des Zuschlags zum Versorgungsfreibetrag, des Altersentlastungsbetrags
                 und des als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in der Bescheinigung für
                 den Lohnsteuerabzug 2025 für den Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
                 Hinzurechnungsbetrags in Cent
     * <p>
     * @param {Big} RE4 input value
     */
    setRE4(RE4: Big): void;
    /**
     * Getter for SONSTB.
     * <p>
     *  Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                 Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)
     * <p>
     * @return the value
     */
    getSONSTB(): Big;
    /**
     * Setter for SONSTB.
     * <p>
     *  Sonstige Bezüge einschließlich zu besteuernde Vorteile bei Vermögensbeteiligungen und Sterbegeld bei Versorgungsbezügen sowie
                 Kapitalauszahlungen/Abfindungen, in Cent (ggf. 0)
     * <p>
     * @param {Big} SONSTB input value
     */
    setSONSTB(SONSTB: Big): void;
    /**
     * Getter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
                 Absatz 4 EStG), in Cent
     * <p>
     * @return the value
     */
    getSONSTENT(): Big;
    /**
     * Setter for SONSTENT.
     * <p>
     *  In SONSTB enthaltene Entschädigungen nach § 24 Nummer 1 EStG sowie zu besteuernde Vorteile bei Vermögensbeteiligungen (§ 19a
                 Absatz 4 EStG), in Cent
     * <p>
     * @param {Big} SONSTENT input value
     */
    setSONSTENT(SONSTENT: Big): void;
    /**
     * Getter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen
                  (in SONSTB enthalten), in Cent
     * <p>
     * @return the value
     */
    getSTERBE(): Big;
    /**
     * Setter for STERBE.
     * <p>
     *  Sterbegeld bei Versorgungsbezuegen sowie Kapitalauszahlungen/Abfindungen
                  (in SONSTB enthalten), in Cent
     * <p>
     * @param {Big} STERBE input value
     */
    setSTERBE(STERBE: Big): void;
    /**
     * Getter for STKL.
     * <p>
     *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
     * <p>
     * @return the value
     */
    getSTKL(): number;
    /**
     * Setter for STKL.
     * <p>
     *  Steuerklasse:
                 1 = I
                 2 = II
                 3 = III
                 4 = IV
                 5 = V
                 6 = VI
     * <p>
     * @param {number} STKL input value
     */
    setSTKL(STKL: number): void;
    /**
     * Getter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach
                 § 19 Absatz 2 Satz 10 und 11 EStG
     * <p>
     * @return the value
     */
    getVBEZ(): Big;
    /**
     * Setter for VBEZ.
     * <p>
     *  In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter Berücksichtigung einer geänderten Bemessungsgrundlage nach
                 § 19 Absatz 2 Satz 10 und 11 EStG
     * <p>
     * @param {Big} VBEZ input value
     */
    setVBEZ(VBEZ: Big): void;
    /**
     * Getter for VBEZM.
     * <p>
     *  Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt
                 wurde, in Cent
     * <p>
     * @return the value
     */
    getVBEZM(): Big;
    /**
     * Setter for VBEZM.
     * <p>
     *  Versorgungsbezug im Januar 2005 bzw. für den ersten vollen Monat, wenn der Versorgungsbezug erstmalig nach Januar 2005 gewährt
                 wurde, in Cent
     * <p>
     * @param {Big} VBEZM input value
     */
    setVBEZM(VBEZM: Big): void;
    /**
     * Getter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
                 Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
                 ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
            
     * <p>
     * @return the value
     */
    getVBEZS(): Big;
    /**
     * Setter for VBEZS.
     * <p>
     *  Voraussichtliche Sonderzahlungen von Versorgungsbezügen im
                 Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
                 ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
            
     * <p>
     * @param {Big} VBEZS input value
     */
    setVBEZS(VBEZS: Big): void;
    /**
     * Getter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @return the value
     */
    getVBS(): Big;
    /**
     * Setter for VBS.
     * <p>
     *  In SONSTB enthaltene Versorgungsbezuege einschliesslich Sterbegeld
                in Cents (ggf. 0)
     * <p>
     * @param {Big} VBS input value
     */
    setVBS(VBS: Big): void;
    /**
     * Getter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
                 werden mehrere Versorgungsbezüge gezahlt, wird aus
                 Vereinfachungsgründen für die Berechnung das Jahr des ältesten
                 erstmaligen Bezugs herangezogen; auf die Möglichkeit der
                 getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
                 EStG) wird im Übrigen verwiesen
     * <p>
     * @return the value
     */
    getVJAHR(): number;
    /**
     * Setter for VJAHR.
     * <p>
     *  Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
                 werden mehrere Versorgungsbezüge gezahlt, wird aus
                 Vereinfachungsgründen für die Berechnung das Jahr des ältesten
                 erstmaligen Bezugs herangezogen; auf die Möglichkeit der
                 getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
                 EStG) wird im Übrigen verwiesen
     * <p>
     * @param {number} VJAHR input value
     */
    setVJAHR(VJAHR: number): void;
    /**
     * Getter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @return the value
     */
    getZKF(): Big;
    /**
     * Setter for ZKF.
     * <p>
     *  Zahl der Freibetraege fuer Kinder (eine Dezimalstelle, nur bei Steuerklassen
                 I, II, III und IV)
     * <p>
     * @param {Big} ZKF input value
     */
    setZKF(ZKF: Big): void;
    /**
     * Getter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden [nur
                 erforderlich bei Jahresberechnung (LZZ = 1)]
     * <p>
     * @return the value
     */
    getZMVB(): number;
    /**
     * Setter for ZMVB.
     * <p>
     *  Zahl der Monate, fuer die Versorgungsbezuege gezahlt werden [nur
                 erforderlich bei Jahresberechnung (LZZ = 1)]
     * <p>
     * @param {number} ZMVB input value
     */
    setZMVB(ZMVB: number): void;
    /**
     * Getter for BK.
     * <p>
     *  Bemessungsgrundlage fuer die Kirchenlohnsteuer in Cents
     * <p>
     * @return the value
     */
    getBK(): Big;
    /**
     * Getter for BKS.
     * <p>
     *  Bemessungsgrundlage der sonstigen Bezüge  für die Kirchenlohnsteuer in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                 Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern BK
                 (maximal bis 0). Der Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen
                 im Rahmen der Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    getBKS(): Big;
    /**
     * Getter for LSTLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltende Lohnsteuer in Cents
     * <p>
     * @return the value
     */
    getLSTLZZ(): Big;
    /**
     * Getter for SOLZLZZ.
     * <p>
     *  Fuer den Lohnzahlungszeitraum einzubehaltender Solidaritaetszuschlag
                 in Cents
     * <p>
     * @return the value
     */
    getSOLZLZZ(): Big;
    /**
     * Getter for SOLZS.
     * <p>
     *  Solidaritätszuschlag für sonstige Bezüge in Cent.
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei
                 Vermögensbeteiligungen (§ 19a Absatz 1 Satz 4 EStG) resultieren,
                 mindern SOLZLZZ (maximal bis 0). Der Sonderausgabenabzug für
                 tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    getSOLZS(): Big;
    /**
     * Getter for STS.
     * <p>
     *  Lohnsteuer für sonstige Bezüge in Cent
                 Hinweis: Negativbeträge, die aus nicht zu besteuernden Vorteilen bei Vermögensbeteiligungen
                 (§ 19a Absatz 1 Satz 4 EStG) resultieren, mindern LSTLZZ (maximal bis 0). Der
                 Sonderausgabenabzug für tatsächlich erbrachte Vorsorgeaufwendungen im Rahmen der
                 Veranlagung zur Einkommensteuer bleibt unberührt.
     * <p>
     * @return the value
     */
    getSTS(): Big;
    /**
     * Getter for VKVLZZ.
     * <p>
     *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers zur
                 privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf. auch
                 die Mindestvorsorgepauschale) in Cent beim laufenden Arbeitslohn. Für Zwecke der Lohn-
                 steuerbescheinigung sind die einzelnen Ausgabewerte außerhalb des eigentlichen Lohn-
                 steuerbescheinigungsprogramms zu addieren; hinzuzurechnen sind auch die Ausgabewerte
                 VKVSONST
     * <p>
     * @return the value
     */
    getVKVLZZ(): Big;
    /**
     * Getter for VKVSONST.
     * <p>
     *  Für den Lohnzahlungszeitraum berücksichtigte Beiträge des Arbeitnehmers
                 zur privaten Basis-Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
                 auch die Mindestvorsorgepauschale) in Cent bei sonstigen Bezügen. Der Ausgabewert kann
                 auch negativ sein.
     * <p>
     * @return the value
     */
    getVKVSONST(): Big;
    /**
     * Getter for VFRB.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getVFRB(): Big;
    /**
     * Getter for VFRBS1.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getVFRBS1(): Big;
    /**
     * Getter for VFRBS2.
     * <p>
     *  Verbrauchter Freibetrag bei Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    getVFRBS2(): Big;
    /**
     * Getter for WVFRB.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über
                dem Grundfreibetrag bei der Berechnung des laufenden Arbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getWVFRB(): Big;
    /**
     * Getter for WVFRBO.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE über dem Grundfreibetrag
                bei der Berechnung des voraussichtlichen Jahresarbeitslohns, in Cent
     * <p>
     * @return the value
     */
    getWVFRBO(): Big;
    /**
     * Getter for WVFRBM.
     * <p>
     *  Für die weitergehende Berücksichtigung des Steuerfreibetrags nach dem DBA Türkei verfügbares ZVE
                über dem Grundfreibetrag bei der Berechnung der sonstigen Bezüge, in Cent
     * <p>
     * @return the value
     */
    getWVFRBM(): Big;
    /**
     * Initialize all inputs values with zero.
     */
    initInputs(): void;
    private isBigInput;
    /**
     * Setter for Big or number input parameters.
     *
     * @param {string} name Variable name to set.
     * @param {number} value Value to set.
     */
    set(name: Lohnsteuer2025InBigType | Lohnsteuer2025InNumberType, value: TaxJsValueType): void;
    /**
     * Getter for all output parameters. You get a value of type "number or "Big".
     *
     * @param {string} name Variable name to get.
     */
    get(name: Lohnsteuer2025InBigType | Lohnsteuer2025InNumberType | Lohnsteuer2025OutType): TaxJsValueType;
    private static readonly typeDirectory;
    /**
     * Get all fields with types.
     */
    getDirectory(): TaxJsDictionary;
    /**
     * Converts a value (number or Big) in the correct type (number or Big).
     *
     * @param {string} name the name of the value
     * @param {TaxJsValueType} value the value to convert
     */
    toType(name: string, value: TaxJsValueType): TaxJsValueType;
}
export {};
