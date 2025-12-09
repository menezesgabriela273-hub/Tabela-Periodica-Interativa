// PeriodicTableInteractive.jsx
// React single-file component (default export)
// Tailwind CSS classes used. Paste this file into a React + Tailwind project.

import React, { useState, useMemo } from "react";

// Dataset with 118 elements. Each element has: z, symbol, name, period, group, discoveryHistory.
// Os textos de 'discoveryHistory' são resumos curtos em português sobre a descoberta/identificação histórica do elemento.
const ELEMENTS = [
  { z: 1, symbol: "H", name: "Hidrogênio", period: 1, group: 1, discoveryHistory: "Identificado por Henry Cavendish em 1766 como gás inflamável; Antoine Lavoisier cunhou o nome 'hydrogène' em 1783." },
  { z: 2, symbol: "He", name: "Hélio", period: 1, group: 18, discoveryHistory: "Detectado no espectro do Sol por Pierre Janssen e Norman Lockyer em 1868; isolado na Terra por William Ramsay posteriormente." },
  { z: 3, symbol: "Li", name: "Lítio", period: 2, group: 1, discoveryHistory: "Descoberto por Johan August Arfwedson em 1817; isolado por Humphry Davy em 1818." },
  { z: 4, symbol: "Be", name: "Berílio", period: 2, group: 2, discoveryHistory: "Identificado como composto por Vauquelin (1797); isolado por Wöhler e Bussy em 1828." },
  { z: 5, symbol: "B", name: "Boro", period: 2, group: 13, discoveryHistory: "Compostos conhecidos desde a antiguidade (boratos); elemento isolado no século XIX por métodos de decomposição térmica e químico." },
  { z: 6, symbol: "C", name: "Carbono", period: 2, group: 14, discoveryHistory: "Conhecido desde tempos pré-históricos nas formas carvão, grafite e diamante; estudado por várias civilizações." },
  { z: 7, symbol: "N", name: "Nitrogênio", period: 2, group: 15, discoveryHistory: "Isolado por Daniel Rutherford em 1772; Lavoisier ajudou a esclarecer sua natureza como elemento." },
  { z: 8, symbol: "O", name: "Oxigênio", period: 2, group: 16, discoveryHistory: "Descoberto independentemente por Carl Wilhelm Scheele e Joseph Priestley (1770s); Lavoisier batizou e explicou seu papel na combustão." },
  { z: 9, symbol: "F", name: "Flúor", period: 2, group: 17, discoveryHistory: "Compostos conhecidos desde antiguidade; elemento livre isolado por Henri Moissan em 1886 via eletrólise de HF." },
  { z: 10, symbol: "Ne", name: "Neônio", period: 2, group: 18, discoveryHistory: "Descoberto por William Ramsay e Morris Travers em 1898 ao fracionar o ar liquefeito." },
  { z: 11, symbol: "Na", name: "Sódio", period: 3, group: 1, discoveryHistory: "Conhecido em compostos (sal) desde a antiguidade; isolado por Humphry Davy em 1807 por eletrólise." },
  { z: 12, symbol: "Mg", name: "Magnésio", period: 3, group: 2, discoveryHistory: "Presente em minerais conhecidos desde a antiguidade; isolado por Davy em 1808." },
  { z: 13, symbol: "Al", name: "Alumínio", period: 3, group: 13, discoveryHistory: "Primeira produção de alumínio puro por Ørsted (1825) e Wöhler; tornou-se comercialmente viável no século XIX." },
  { z: 14, symbol: "Si", name: "Silício", period: 3, group: 14, discoveryHistory: "Isolado por J. J. Berzelius em 1824 por redução da sílica; compostos usados desde a antiguidade." },
  { z: 15, symbol: "P", name: "Fósforo", period: 3, group: 15, discoveryHistory: "Descoberto por Hennig Brand em 1669 ao destilar urina; conhecido pelo brilho (fosforescência) do fósforo branco." },
  { z: 16, symbol: "S", name: "Enxofre", period: 3, group: 16, discoveryHistory: "Conhecido desde a antiguidade (brimstone); usado por alquimistas e em medicina tradicional." },
  { z: 17, symbol: "Cl", name: "Cloro", period: 3, group: 17, discoveryHistory: "Descoberto por Carl Wilhelm Scheele em 1774 como gás; Humphry Davy confirmou que era um elemento." },
  { z: 18, symbol: "Ar", name: "Argônio", period: 3, group: 18, discoveryHistory: "Descoberto por Lord Rayleigh e William Ramsay em 1894 ao estudar discrepâncias na densidade do ar." },
  { z: 19, symbol: "K", name: "Potássio", period: 4, group: 1, discoveryHistory: "Isolado por Humphry Davy em 1807 por eletrólise da potassa; compostos conhecidos há milênios." },
  { z: 20, symbol: "Ca", name: "Cálcio", period: 4, group: 2, discoveryHistory: "Conhecido como calcário e cal desde a antiguidade; isolado metalicamente por Davy em 1808." },
  { z: 21, symbol: "Sc", name: "Escândio", period: 4, group: 3, discoveryHistory: "Descoberto em minerais por Lars Fredrik Nilson em 1879 e nomeado após a Escandinávia." },
  { z: 22, symbol: "Ti", name: "Titânio", period: 4, group: 4, discoveryHistory: "Identificado por William Gregor em 1791 em minerais; o elemento isolado por Jöns Jacob Berzelius em 1825." },
  { z: 23, symbol: "V", name: "Vanádio", period: 4, group: 5, discoveryHistory: "Descoberto por Andrés Manuel del Río (1801) e reconhecido por Nils Gabriel Sefström em 1830; nome inspirado em Vanadis (Freya)." },
  { z: 24, symbol: "Cr", name: "Cromo", period: 4, group: 6, discoveryHistory: "Descoberto por Louis Nicolas Vauquelin em 1797 ao analisar minerais coloridos; usado em pigmentos e ligas." },
  { z: 25, symbol: "Mn", name: "Manganês", period: 4, group: 7, discoveryHistory: "Conhecido em óxidos e minerais desde a antiguidade; isolado como elemento no século XVIII." },
  { z: 26, symbol: "Fe", name: "Ferro", period: 4, group: 8, discoveryHistory: "Um dos metais mais antigos conhecidos; usado desde a Idade do Ferro, com produção e forjamento muito antigos." },
  { z: 27, symbol: "Co", name: "Cobalto", period: 4, group: 9, discoveryHistory: "Conhecido desde a Idade Média por mineradores (compostos coloridos); isolado como elemento por Brandt em 1735." },
  { z: 28, symbol: "Ni", name: "Níquel", period: 4, group: 10, discoveryHistory: "Descoberto por Axel Fredrik Cronstedt em 1751, isolado a partir de minério chamado 'kupfernickel'." },
  { z: 29, symbol: "Cu", name: "Cobre", period: 4, group: 11, discoveryHistory: "Metal usado desde a pré-história; civilizações antigas exploraram e trabalharam o cobre extensivamente." },
  { z: 30, symbol: "Zn", name: "Zinco", period: 4, group: 12, discoveryHistory: "Conhecido em ligas (latão) desde a antiguidade; isolado como metal em processos por volta do século XIII na Índia e Europa." },
  { z: 31, symbol: "Ga", name: "Gálio", period: 4, group: 13, discoveryHistory: "Predito por Mendeleev e descoberto por Paul Emile Lecoq de Boisbaudran em 1875 via espectroscopia." },
  { z: 32, symbol: "Ge", name: "Germânio", period: 4, group: 14, discoveryHistory: "Descoberto por Clemens Winkler em 1886; elemento previsto por Mendeleev (ekasilício)." },
  { z: 33, symbol: "As", name: "Arsênio", period: 4, group: 15, discoveryHistory: "Conhecido desde a antiguidade em compostos; nome e algumas propriedades eram conhecidas por antigos alquimistas." },
  { z: 34, symbol: "Se", name: "Selênio", period: 4, group: 16, discoveryHistory: "Descoberto por Jöns Jakob Berzelius em 1817 ao analisar resíduos de produção de ácido sulfúrico." },
  { z: 35, symbol: "Br", name: "Bromo", period: 4, group: 17, discoveryHistory: "Descoberto por Antoine Jérôme Balard e Carl Löwig em 1826-1827 ao tratar águas salobras; nome do grego 'bromos' (odor)." },
  { z: 36, symbol: "Kr", name: "Criptônio", period: 4, group: 18, discoveryHistory: "Descoberto por William Ramsay e Morris Travers em 1898 durante a fracionamento do ar liquefeito." },
  { z: 37, symbol: "Rb", name: "Rubídio", period: 5, group: 1, discoveryHistory: "Descoberto por Robert Bunsen e Gustav Kirchhoff em 1861 via espectroscopia (linhas rubiadas)." },
  { z: 38, symbol: "Sr", name: "Estrôncio", period: 5, group: 2, discoveryHistory: "Nomeado a partir do mineral encontrado em Strontian (Escócia); reconhecido no final do século XVIII e isolado no século XIX." },
  { z: 39, symbol: "Y", name: "Ítrio", period: 5, group: 3, discoveryHistory: "Descoberto por Johan Gadolin em 1794 em um mineral da Ytterby (Suécia); mais tarde isolado como elemento." },
  { z: 40, symbol: "Zr", name: "Zircônio", period: 5, group: 4, discoveryHistory: "Conhecido em minerais; isolado como metal no século XIX por vários químicos que estudaram zircônia." },
  { z: 41, symbol: "Nb", name: "Nióbio", period: 5, group: 5, discoveryHistory: "Descoberto por Charles Hatchett em 1801 (chamado columbium anteriormente); confirmado como elemento distinto no século XIX." },
  { z: 42, symbol: "Mo", name: "Molibdênio", period: 5, group: 6, discoveryHistory: "Conhecido desde a antiguidade em minerais; isolado como elemento no século XIX; nome do grego 'molybdos'." },
  { z: 43, symbol: "Tc", name: "Tecnécio", period: 5, group: 7, discoveryHistory: "Primeiro elemento sintético produzido (1937) por Carlo Perrier e Emilio Segrè; nome do grego 'technetos' (artificial)." },
  { z: 44, symbol: "Ru", name: "Rutênio", period: 5, group: 8, discoveryHistory: "Descoberto por Karl Ernst Claus em 1844 a partir de platina russa; nome vindo de 'Ruthenia' (Rússia)." },
  { z: 45, symbol: "Rh", name: "Ródio", period: 5, group: 9, discoveryHistory: "Descoberto por William Hyde Wollaston em 1803 em resíduos de platina; usado em ligas e catalisadores." },
  { z: 46, symbol: "Pd", name: "Paládio", period: 5, group: 10, discoveryHistory: "Descoberto por William Hyde Wollaston em 1803; nome inspirado no asteroide Pallas." },
  { z: 47, symbol: "Ag", name: "Prata", period: 5, group: 11, discoveryHistory: "Metal conhecido e trabalhado desde a antiguidade por várias culturas para moedas, ornamentos e utensílios." },
  { z: 48, symbol: "Cd", name: "Cádmio", period: 5, group: 12, discoveryHistory: "Descoberto por Friedrich Stromeyer em 1817 como impureza em carbonato de zinco; isolado posteriormente." },
  { z: 49, symbol: "In", name: "Índio", period: 5, group: 13, discoveryHistory: "Descoberto por Ferdinand Reich e Hieronymous Theodor Richter em 1863 via espectroscopia (linha índigo)." },
  { z: 50, symbol: "Sn", name: "Estanho", period: 5, group: 14, discoveryHistory: "Metal conhecido desde a antiguidade; usado em ligas como o bronze (com cobre)." },
  { z: 51, symbol: "Sb", name: "Antimônio", period: 5, group: 15, discoveryHistory: "Conhecido desde a antiguidade em compostos; usado por alquimistas e em medicina tradicional." },
  { z: 52, symbol: "Te", name: "Telúrio", period: 5, group: 16, discoveryHistory: "Descoberto por Franz-Joseph Müller von Reichenstein e identificações posteriores por Martin Heinrich Klaproth no século XVIII." },
  { z: 53, symbol: "I", name: "Iodo", period: 5, group: 17, discoveryHistory: "Descoberto por Bernard Courtois em 1811 ao processar algas marinhas para extrair salitre; nome do grego 'ioeides' (violeta)." },
  { z: 54, symbol: "Xe", name: "Xenônio", period: 5, group: 18, discoveryHistory: "Descoberto por William Ramsay e Morris Travers em 1898 na separação do ar liquefeito; nome do grego 'xenos' (estrangeiro)." },
  { z: 55, symbol: "Cs", name: "Césio", period: 6, group: 1, discoveryHistory: "Descoberto por Bunsen e Kirchhoff em 1860 via espectroscopia (linhas azul-celeste)." },
  { z: 56, symbol: "Ba", name: "Bário", period: 6, group: 2, discoveryHistory: "Detectado em minerais e isolado como óxido/hidróxido no século XVIII; o metal isolado por volta de 1808-1809." },
  { z: 57, symbol: "La", name: "Lantânio", period: 6, group: 3, discoveryHistory: "Descoberto por Carl Gustaf Mosander em 1839 no mineral cerita; deu nome à família dos lantanoides." },
  { z: 58, symbol: "Ce", name: "Cério", period: 6, group: 3, discoveryHistory: "Descoberto independentemente por Martin Heinrich Klaproth e Jons Jakob Berzelius em minerais no início do século XIX; nomeado após o asteroide Ceres." },
  { z: 59, symbol: "Pr", name: "Praseodímio", period: 6, group: 3, discoveryHistory: "Identificado por Carl Auer von Welsbach em 1885 dividindo óxidos anteriormente confundidos; nome do grego para 'verde'." },
  { z: 60, symbol: "Nd", name: "Neodímio", period: 6, group: 3, discoveryHistory: "Também separado por Auer von Welsbach em 1885 como componente de misturas complexas de terras raras." },
  { z: 61, symbol: "Pm", name: "Promécio", period: 6, group: 3, discoveryHistory: "Elemento radioativo sintético descoberto por Jacob A. Marinsky e colegas em 1945; nome do grego 'prometheos'." },
  { z: 62, symbol: "Sm", name: "Samário", period: 6, group: 3, discoveryHistory: "Descoberto por Jean Charles Galissard de Marignac em meados do século XIX em minerais de terras raras; nomeado após o mineral samarskita." },
  { z: 63, symbol: "Eu", name: "Európio", period: 6, group: 3, discoveryHistory: "Identificado por Eugène-Anatole Demarçay em 1901; nome em homenagem à Europa (continente)." },
  { z: 64, symbol: "Gd", name: "Gadolínio", period: 6, group: 3, discoveryHistory: "Descoberto por Jean de Marignac em 1880 em minerais; nome homenageia o químico Gadolin." },
  { z: 65, symbol: "Tb", name: "Térbio", period: 6, group: 3, discoveryHistory: "Identificado a partir de minerais que continham misturas de terras raras; isolado e nomeado no século XIX." },
  { z: 66, symbol: "Dy", name: "Disprósio", period: 6, group: 3, discoveryHistory: "Descoberto por Paul Émile Lecoq de Boisbaudran em 1886; nome do grego 'difícil de encontrar'." },
  { z: 67, symbol: "Ho", name: "Hólmio", period: 6, group: 3, discoveryHistory: "Descoberto por Per Teodor Cleve em 1878; nome deriva de 'Holmia' (Latim para Estocolmo)." },
  { z: 68, symbol: "Er", name: "Érbio", period: 6, group: 3, discoveryHistory: "Descoberto por Carl Gustaf Mosander em 1843; nomeado por Ytterby, local na Suécia onde muitos minerais foram extraídos." },
  { z: 69, symbol: "Tm", name: "Túlio", period: 6, group: 3, discoveryHistory: "Descoberto por Per Teodor Cleve em 1879; nome derivado de 'Thule', um nome antigo para regiões do norte." },
  { z: 70, symbol: "Yb", name: "Itérbio", period: 6, group: 3, discoveryHistory: "Identificado por Jean de Marignac em 1878 a partir de minerais de terras raras; nome de Ytterby." },
  { z: 71, symbol: "Lu", name: "Lutécio", period: 6, group: 3, discoveryHistory: "Descoberto por Georges Urbain em 1907; nome refere-se a Lutetia (antigo nome de Paris)." },
  { z: 72, symbol: "Hf", name: "Háfnio", period: 6, group: 4, discoveryHistory: "Previsto por Mendeleev e descoberto por Dirk Coster e George de Hevesy em 1923 em resíduos de zircônia; nome de Hafnia (Copenhague)." },
  { z: 73, symbol: "Ta", name: "Tântalo", period: 6, group: 5, discoveryHistory: "Descoberto por Anders Ekeberg em 1802 em minerais difíceis de processar; nome vindo da mitologia (Tântalo)." },
  { z: 74, symbol: "W", name: "Tungstênio (Wolfram)", period: 6, group: 6, discoveryHistory: "Descoberto em compostos por Martín Heinrich Klaproth (hábito) e isolado por José e Fausto Elhuyar no final do século XVIII; símbolo W vem de 'Wolfram'." },
  { z: 75, symbol: "Re", name: "Rénio", period: 6, group: 7, discoveryHistory: "Descoberto por Walter Noddack, Ida Noddack e Otto Berg em 1925 em minérios de platina; nome do rio Reno (Rhein)." },
  { z: 76, symbol: "Os", name: "Ósmio", period: 6, group: 8, discoveryHistory: "Descoberto por Smithson Tennant em 1803 ao estudar resíduos de platina; nome do grego 'osme' (odor) devido ao cheiro de seus óxidos." },
  { z: 77, symbol: "Ir", name: "Irídio", period: 6, group: 9, discoveryHistory: "Também descoberto por Smithson Tennant em 1803 em resíduos da platina; nome do latim 'iris' (arco-íris) por suas cores de compostos." },
  { z: 78, symbol: "Pt", name: "Platina", period: 6, group: 10, discoveryHistory: "Conhecida e usada desde o século XVI na América do Sul; estudada e isolada por químicos europeus no século XVIII." },
  { z: 79, symbol: "Au", name: "Ouro", period: 6, group: 11, discoveryHistory: "Um dos metais mais antigos usados por humanos; mineração e trabalho com ouro datam de milênios." },
  { z: 80, symbol: "Hg", name: "Mercúrio", period: 6, group: 12, discoveryHistory: "Metal conhecido desde a antiguidade (mercúrio nativo e cinábrio); usado em medicina e alquimia por séculos." },
  { z: 81, symbol: "Tl", name: "Tálio", period: 6, group: 13, discoveryHistory: "Descoberto por Sir William Crookes em 1861 via espectroscopia (linhas verdes)." },
  { z: 82, symbol: "Pb", name: "Chumbo", period: 6, group: 14, discoveryHistory: "Metal conhecido desde a antiguidade; amplamente usado em tubulações, pigmentos e ligas históricas." },
  { z: 83, symbol: "Bi", name: "Bismuto", period: 6, group: 15, discoveryHistory: "Conhecido desde a Idade Média e frequentemente confundido com chumbo e estanho; reconhecido como elemento distinto no século XVIII." },
  { z: 84, symbol: "Po", name: "Polônio", period: 6, group: 16, discoveryHistory: "Descoberto por Marie e Pierre Curie em 1898 em minerais de urânio; elemento radioativo nomeado em homenagem à Polônia." },
  { z: 85, symbol: "At", name: "Astato", period: 6, group: 17, discoveryHistory: "Elemento altamente radioativo e raro, identificado pela primeira vez em 1940 por Dale R. Corson, Kenneth Ross MacKenzie e Emilio Segrè." },
  { z: 86, symbol: "Rn", name: "Radônio", period: 6, group: 18, discoveryHistory: "Descoberto como um gás radioativo desprendido de decaimento do rádio no início do século XX; estudado por Rutherford e outros." },
  { z: 87, symbol: "Fr", name: "Frâncio", period: 7, group: 1, discoveryHistory: "Descoberto por Marguerite Perey em 1939 em amostras de actínio; elemento raro e radioativo." },
  { z: 88, symbol: "Ra", name: "Rádio", period: 7, group: 2, discoveryHistory: "Descoberto por Marie e Pierre Curie em 1898 em minerais como pechblenda; famoso por sua radioatividade." },
  { z: 89, symbol: "Ac", name: "Actínio", period: 7, group: 3, discoveryHistory: "Descoberto por André-Louis Debierne em 1899 em minerais radioativos; dá nome à série dos actinídeos." },
  { z: 90, symbol: "Th", name: "Tório", period: 7, group: 3, discoveryHistory: "Identificado por Jöns Jakob Berzelius em 1829 em minerais; nomeado em homenagem ao deus nórdico Thor." },
  { z: 91, symbol: "Pa", name: "Protactínio", period: 7, group: 3, discoveryHistory: "Reconhecido no início do século XX por pesquisadores como Kasimir Fajans e Oswald Helmuth Göhring; nome alterado historicamente." },
  { z: 92, symbol: "U", name: "Urânio", period: 7, group: 3, discoveryHistory: "Descoberto por Martin Heinrich Klaproth em 1789 em minerais; nomeado após o planeta Urano, descoberto pouco antes." },
  { z: 93, symbol: "Np", name: "Netúnio", period: 7, group: 3, discoveryHistory: "Primeiro elemento transurânico sintetizado (1940) por Edwin McMillan e Philip H. Abelson; nome em homenagem a Netuno." },
  { z: 94, symbol: "Pu", name: "Plutônio", period: 7, group: 3, discoveryHistory: "Sintetizado por Glenn T. Seaborg e colaboradores em 1940; nome em homenagem a Plutão." },
  { z: 95, symbol: "Am", name: "Amerício", period: 7, group: 3, discoveryHistory: "Sintetizado durante o projeto Manhattan (1944); nome em homenagem às Américas." },
  { z: 96, symbol: "Cm", name: "Cúrio", period: 7, group: 3, discoveryHistory: "Descoberto por Glenn Seaborg e equipe em 1944; nome em homenagem a Marie e Pierre Curie." },
  { z: 97, symbol: "Bk", name: "Berquélio", period: 7, group: 3, discoveryHistory: "Sintetizado por pesquisadores da Berkeley Radiation Laboratory em 1949; nome da cidade de Berkeley." },
  { z: 98, symbol: "Cf", name: "Califórnio", period: 7, group: 3, discoveryHistory: "Descoberto em 1950 na Universidade da Califórnia, Berkeley; nomeado em homenagem ao estado da Califórnia." },
  { z: 99, symbol: "Es", name: "Einstênio", period: 7, group: 3, discoveryHistory: "Sintetizado em 1952; nomeado em homenagem a Albert Einstein." },
  { z: 100, symbol: "Fm", name: "Férmio", period: 7, group: 3, discoveryHistory: "Descoberto em resíduos de testes nucleares em 1952; nomeado em homenagem a Enrico Fermi." },
  { z: 101, symbol: "Md", name: "Mendelévio", period: 7, group: 3, discoveryHistory: "Sintetizado em 1955; nome em homenagem a Dmitri Mendeleev." },
  { z: 102, symbol: "No", name: "Nobélio", period: 7, group: 3, discoveryHistory: "Descoberto em 1958; nomeado em homenagem a Alfred Nobel." },
  { z: 103, symbol: "Lr", name: "Laurêncio", period: 7, group: 3, discoveryHistory: "Descoberto em 1961 e nomeado em homenagem ao laboratório Lawrence (Ernest O. Lawrence)." },
  { z: 104, symbol: "Rf", name: "Rutherfordium", period: 7, group: 4, discoveryHistory: "Primeiras reivindicações de síntese nas décadas de 1960-1970; nome oficial reconhecido como rutherfordium em homenagem a Ernest Rutherford." },
  { z: 105, symbol: "Db", name: "Dubnium", period: 7, group: 5, discoveryHistory: "Elementos transactinídeos com disputa histórica entre laboratórios soviéticos e americanos; nome dubnium refere-se a Dubna." },
  { z: 106, symbol: "Sg", name: "Seabórgio", period: 7, group: 6, discoveryHistory: "Sintetizado no final do século XX e nomeado em homenagem a Glenn Seaborg." },
  { z: 107, symbol: "Bh", name: "Bóhrio", period: 7, group: 7, discoveryHistory: "Descoberto em experimentos de síntese nuclear tardios; nomeado em homenagem a Niels Bohr." },
  { z: 108, symbol: "Hs", name: "Hássio", period: 7, group: 8, discoveryHistory: "Descoberto em Darmstadt (Alemanha) em 1984; nomeado em referência ao estado de Hesse (Hassia)." },
  { z: 109, symbol: "Mt", name: "Meitnério", period: 7, group: 9, discoveryHistory: "Sintetizado em 1982 em Darmstadt; nomeado em homenagem a Lise Meitner." },
  { z: 110, symbol: "Ds", name: "Darmstácio", period: 7, group: 10, discoveryHistory: "Sintetizado em Darmstadt na década de 1990; nome refere-se à cidade de Darmstadt." },
  { z: 111, symbol: "Rg", name: "Roentgênio", period: 7, group: 11, discoveryHistory: "Sintetizado no final do século XX; nome em homenagem a Wilhelm Röntgen." },
  { z: 112, symbol: "Cn", name: "Copernício", period: 7, group: 12, discoveryHistory: "Confirmado por síntese em laboratórios modernos; nome homenageia Nicolau Copérnico." },
  { z: 113, symbol: "Nh", name: "Nihônio", period: 7, group: 13, discoveryHistory: "Síntese confirmada no Japão; nome 'Nihonium' refere-se a 'Nihon' (Japão)." },
  { z: 114, symbol: "Fl", name: "Fleróvio", period: 7, group: 14, discoveryHistory: "Sintetizado em Dubna; nome em homenagem a Georgy Flyorov." },
  { z: 115, symbol: "Mc", name: "Moscóvio", period: 7, group: 15, discoveryHistory: "Sintetizado em laboratórios russos; nome refere-se a Moscou." },
  { z: 116, symbol: "Lv", name: "Livermório", period: 7, group: 16, discoveryHistory: "Sintetizado por colaboração internacional; nome em homenagem ao Lawrence Livermore National Laboratory." },
  { z: 117, symbol: "Ts", name: "Tenessino", period: 7, group: 17, discoveryHistory: "Sintetizado por equipes colaborativas; nome refere-se ao estado do Tennessee." },
  { z: 118, symbol: "Og", name: "Oganessônio", period: 7, group: 18, discoveryHistory: "Confirmado por sínteses em laboratórios; nome em homenagem ao físico Yuri Oganessian." },
];

export default function PeriodicTableInteractive() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ELEMENTS;
    return ELEMENTS.filter(
      (e) =>
        String(e.z) === q ||
        e.symbol.toLowerCase().includes(q) ||
        e.name.toLowerCase().includes(q) ||
        (e.discoveryHistory && e.discoveryHistory.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tabela Periódica Interativa</h1>
        <p className="text-sm text-gray-600">Clique em um elemento para ver a história da sua descoberta.</p>
      </header>

      <div className="mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar por nome, símbolo ou número atômico"
          className="px-3 py-2 rounded border w-full max-w-md"
        />
        <button
          onClick={() => {
            setQuery("");
            setSelected(null);
          }}
          className="px-3 py-2 rounded border"
        >
          Limpar
        </button>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Table area */}
        <section>
          <div
            className="relative bg-white p-4 rounded shadow overflow-auto"
            style={{ minHeight: 420 }}
          >
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(18, minmax(40px, 56px))",
                gridAutoRows: "56px",
                gap: 6,
              }}
            >
              {/* Render empty grid cells to preserve layout */}
              {Array.from({ length: 18 * 9 }).map((_, i) => (
                <div key={i} className="opacity-0" />
              ))}

              {/* Render elements placed by group and period */}
              {filtered.map((el) => {
                const style = {
                  gridColumn: `${el.group}`,
                  gridRow: `${el.period}`,
                };
                return (
                  <button
                    key={el.z}
                    onClick={() => setSelected(el)}
                    aria-label={`${el.name} (${el.symbol}), número atômico ${el.z}`}
                    className="flex flex-col items-center justify-center rounded border p-1 text-xs hover:shadow focus:shadow focus:outline-none bg-white"
                    style={style}
                  >
                    <div className="text-sm font-semibold">{el.symbol}</div>
                    <div className="text-[10px] text-gray-600">{el.z}</div>
                    <div className="text-[9px] mt-1">{el.name}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-gray-500">Legenda: clique em um bloco para abrir a história.</div>
          </div>
        </section>

        {/* Details panel */}
        <aside className="col-span-1 md:col-span-2">
          <div className="bg-white p-4 rounded shadow h-full">
            {selected ? (
              <article>
                <header className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {selected.name} <span className="text-sm text-gray-500">({selected.symbol})</span>
                    </h2>
                    <div className="text-sm text-gray-600">Número atômico: {selected.z}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-sm px-2 py-1 border rounded"
                    >
                      Fechar
                    </button>
                  </div>
                </header>

                <section className="mt-4 leading-relaxed text-sm text-gray-800">
                  <h3 className="font-semibold mb-2">História da descoberta</h3>
                  <p>{selected.discoveryHistory}</p>
                </section>

                <section className="mt-4 text-xs text-gray-500">
                  <strong>Observações:</strong>
                  <ul className="list-disc ml-5 mt-2">
                    <li>A história no painel é um resumo — para fontes primárias ou detalhamento histórico, você pode expandir cada entrada.</li>
                    <li>Para adicionar mais elementos ou detalhes: edite o array <code>ELEMENTS</code> no topo do arquivo e inclua period, group e discoveryHistory.</li>
                  </ul>
                </section>
              </article>
            ) : (
              <div className="text-gray-600">
                Selecione um elemento à esquerda para ver a história da sua descoberta. A lista contém os 118 elementos com resumos sobre suas descobertas.
              </div>
            )}

            <div className="mt-6 border-t pt-4 text-xs text-gray-500">
              Dicas: exporte este componente como página única, ou integre em sua app. Se quiser, eu posso gerar também um arquivo ZIP pronto para deploy ou um repositório GitHub com este componente.
            </div>
          </div>
        </aside>
      </main>

      <footer className="mt-8 text-xs text-gray-500">
        Protótipo completo com 118 elementos. Se quiser que eu gere um ZIP para download ou crie um repositório GitHub com deploy (GitHub Pages / Vercel), diga qual opção prefere: "ZIP" ou "GitHub".
      </footer>
    </div>
  );
}
