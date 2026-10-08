export type MediaAsset = {
  src: string;
  mobileSrc?: string;
  alt: string;
  slotTitle: string;
  focus?: string;
  width: number;
  height: number;
};

// All imagery is local and conceptual. Replace slots with licensed photographs.
// People in the care scene are fictional and AI-generated; they do not represent real clinicians.
function editorial(name: string, alt: string, height = 800) {
  return {
    src: '/images/' + name + '-editorial.webp',
    mobileSrc: '/images/' + name + '-editorial-720.webp',
    alt: 'Fotografia conceitual gerada por IA: ' + alt,
    width: 1200, height,
  };
}
export const media: Record<string, MediaAsset> = {
  experience: { ...editorial('experience-environment', 'ambiente de espera de clínica odontológica fictícia, com luz natural, poltronas e cadeira de atendimento ao fundo.', 960), slotTitle: 'Ambiente e acolhimento', width: 1440, focus: '60% 50%' },
  technology: { ...editorial('scanner', 'mão com luva segurando scanner intraoral junto a modelo dental, em sala de consulta.', 675), slotTitle: 'Scanner intraoral e planejamento', width: 1600, height: 900, focus: '65% 50%' },
  estetica: { ...editorial('estetica-smile', 'detalhe de sorriso natural de pessoa fictícia. Não representa resultado de tratamento.'), slotTitle: 'Estética dental e naturalidade', focus: '50% 50%' },
  ortodontia: { ...editorial('ortodontia', 'alinhadores transparentes sobre bancada de pedra, com modelo dental ao fundo.'), slotTitle: 'Alinhadores e ortodontia', focus: '50% 60%' },
  implantes: { ...editorial('implantes', 'modelo educativo de dentes e implante dental sobre bancada de consulta.'), slotTitle: 'Diagnóstico e planejamento de implantes', focus: '35% 50%' },
  prevencao: { ...editorial('prevencao', 'mãos com luvas preparando espelho e instrumento odontológico em bandeja.'), slotTitle: 'Materiais de avaliação preventiva', focus: '65% 50%' },
  team: { ...editorial('team-care', 'dentista fictícia com máscara e luvas durante avaliação odontológica de paciente, com outro profissional ao fundo.', 960), slotTitle: 'Atendimento e cuidado humano', width: 1440, focus: '55% 45%' },
  contact: { ...editorial('contact', 'arquitetura de clínica odontológica fictícia, com corredor, recepção e cadeira de atendimento ao fundo.', 1600), slotTitle: 'Arquitetura da clínica', focus: '50% 50%' },
};

