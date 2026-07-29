import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { FloatingEmoji } from "./FloatingEmoji";

const paragraphs = [
  "Nossa história não começou do jeito que a maioria das histórias de amor costuma começar. Não houve um primeiro olhar inesquecível, uma troca de sorrisos ou a sensação de que o destino já havia escrito tudo. Na verdade, nosso primeiro encontro foi uma discussão sobre ICMS, PIS, COFINS e subvenções. Sim… definitivamente não é o início mais romântico do mundo.",
  "Éramos apenas dois profissionais defendendo seus pontos de vista. A conversa terminou, cada um seguiu seu caminho e, sinceramente, eu jamais imaginaria que aquela pessoa faria parte da minha vida de uma forma tão profunda. Algum tempo depois, nos encontramos novamente em um evento da empresa. Mas, mesmo sem perceber, eu já começava a enxergar o Leandro de uma forma diferente. Havia algo na maneira como conduzia os projetos, na segurança técnica e na forma respeitosa de lidar com as pessoas que chamava minha atenção.",
  "O tempo passou e nossos caminhos se separaram. Leandro mudou de estado para assumir um novo desafio profissional. Meses depois, chegou um momento difícil para mim. Eu já não me via pertencendo ao ambiente em que trabalhava. Quando pensei em quem poderia me orientar, apenas um nome veio à minha cabeça: Leandro. Enviei uma mensagem perguntando se ele conhecia alguma vaga. A resposta veio acompanhada de um desafio enorme: havia uma oportunidade, mas ela exigia que eu mudasse de estado. Aceitei o desafio e fui trabalhar na Planning.",
  "Naquele período, nossas histórias atravessavam fases completamente diferentes, mas igualmente delicadas. Enquanto eu carregava muitas dores, incertezas e vínculos que ainda me prendiam a uma realidade difícil em Recife, o Leandro enfrentava o processo de encerramento de um casamento. Nenhum dos dois vivia o momento mais leve da vida. Ainda assim, curiosamente, foi justamente nesse cenário que encontramos um no outro um lugar seguro.",
  "No começo, confesso que ele me irritava. Eu vinha de uma realidade acelerada, marcada por conflitos e comunicações duras. O Leandro era exatamente o oposto: extremamente calmo, paciente e gentil. Com o tempo, percebi que aquela calma que antes me incomodava começou, pouco a pouco, a me curar. Enquanto enfrentávamos nossos próprios desafios, passamos a conversar cada vez mais. Um apoiava o outro sem perceber que estava construindo algo muito maior do que uma amizade.",
  "Foi também nessa época que a vida me apresentou um dos maiores presentes que eu receberia: Paulo. Nosso primeiro passeio foi uma exposição no Passeio das Águas, e naquele momento, eu jamais imaginava que aquele menino faria parte da minha história para sempre. Quando o processo de divórcio foi oficialmente concluído, a aproximação que já existia entre nós aconteceu de forma muito natural. Não houve pressa. Simplesmente percebemos que já fazíamos parte da vida um do outro.",
  "Meses depois, viajamos para o Rio de Janeiro. Foi lá, em um cenário lindo, que veio o pedido de namoro. A resposta, obviamente, foi sim. Poucos meses depois, decidimos dar mais um passo e construir um lar juntos. Seis meses depois daquele pedido de namoro, em dezembro de 2024, veio mais uma surpresa: o pedido de casamento. Mais uma vez, a resposta foi sim.",
  "Hoje, moramos juntos: eu, Leandro e Paulo. Somos uma família de verdade. Como qualquer família, temos nossas diferenças, nossas conversas difíceis e nossos dias turbulentos. Mas também temos uma certeza muito bonita: tudo acontece entre nós. As alegrias são compartilhadas pelos três. Os desafios também. Existe respeito, parceria e um compromisso diário de cuidar uns dos outros.",
  "E é justamente por isso que este casamento não representa o início da nossa história. Ele é a celebração dela. É a oportunidade de reunir as pessoas que amamos para agradecer por todos os caminhos improváveis que nos trouxeram até aqui.",
];

export function Historia() {
  return (
    <section id="historia" className="relative overflow-hidden py-21">
      <FloatingEmoji emoji="🌊" style={{ top: "20%", left: "10%" }} />
      <FloatingEmoji emoji="⛵" style={{ top: "40%", right: "5%" }} delay={2} />
      <FloatingEmoji emoji="🐚" size={80} style={{ top: "60%", left: "5%" }} delay={4} />
      <FloatingEmoji emoji="💨" style={{ top: "80%", right: "10%" }} delay={1} />
      <div className="mx-auto max-w-[1000px] px-6.5 text-center">
        <Reveal>
          <SectionHeader eyebrow="o nosso encontro" title="Nossa História" />
        </Reveal>

        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 0.03, 0.2)}>
            <p className="mx-auto mt-8 max-w-[680px] text-xl text-ink-soft first:mt-0">
              {p}
            </p>
          </Reveal>
        ))}

        <Reveal>
          <p className="mx-auto mt-10.5 max-w-[680px] text-lg leading-[1.9] font-medium text-sage-deep italic">
            Às vezes, o amor não chega de forma avassaladora. Às vezes, ele
            chega devagar. Começa com uma conversa sobre tributos.
            Transforma-se em admiração. Depois em amizade. Em parceria. Em
            família. E, quando percebemos, já se tornou o lugar para onde
            sempre queremos voltar.
          </p>
        </Reveal>

        <div className="mt-16 pr-8 text-right">
          <div className="font-script text-3xl tracking-wide text-sage-deep/80">
            Thays V Pontes
          </div>
        </div>
      </div>
    </section>
  );
}
