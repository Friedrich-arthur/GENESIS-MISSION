import React, { useState } from 'react';
import { 
  Rocket, 
  Brain, 
  Database, 
  Cpu, 
  Workflow, 
  Users, 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  Circle,
  ArrowRight,
  Server,
  Zap,
  Quote,
  FileText,
  Gavel,
  Lock,
  Globe2,
  AlertTriangle
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// --- Types ---

interface ChecklistItem {
  id: string;
  text: string;
  subText?: string;
  isDone: boolean;
}

interface StrategySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  items: ChecklistItem[];
}

// --- Data Constants ---

const RADAR_DATA = [
  { subject: 'AI 营收占比', A: 120, fullMark: 150 },
  { subject: '研发投入比', A: 98, fullMark: 150 },
  { subject: '数据资产化', A: 86, fullMark: 150 },
  { subject: '自动化覆盖', A: 99, fullMark: 150 },
  { subject: '外部合作数', A: 65, fullMark: 150 },
  { subject: '合规成熟度', A: 110, fullMark: 150 },
];

const STRATEGY_DATA: StrategySection[] = [
  {
    id: 'strategy',
    title: '战略定位：顺势而为',
    icon: <Rocket className="w-5 h-5" />,
    description: '在“美国科学主导权”的国家叙事中，精准定位企业的角色。',
    items: [
      { id: 's1', text: '相关性判定', subText: '是否涉及能源、国防军工、关键材料、生物技术等“行政令优先领域”？', isDone: false },
      { id: 's2', text: '生态位选择', subText: '做“国家队的军火商”（卖铲子），还是做“利用平台的淘金者”？', isDone: false },
      { id: 's3', text: '建立“Genesis 雷达”', subText: '按季度监控 AI 收入与国家项目的重合度，对齐联邦资金流向。', isDone: false },
    ]
  },
  {
    id: 'data',
    title: '数据资产：新石油',
    icon: <Database className="w-5 h-5" />,
    description: '打造企业版小型 ASSP 数据层，将沉睡的数据转化为战略资产。',
    items: [
      { id: 'd1', text: '科研/工程数据地图', subText: '清点图纸、配方、实验日志、OT 数据——这是未来最大的护城河。', isDone: false },
      { id: 'd2', text: '数据标准化与清洗', subText: '让数据达到“AI 可读”标准，为接入国家级平台做准备。', isDone: false },
      { id: 'd3', text: '分级资产卡片', subText: '明确哪些数据是核心机密（绝不共享），哪些是合作筹码。', isDone: false },
    ]
  },
  {
    id: 'compute',
    title: '算力基建：硬实力',
    icon: <Cpu className="w-5 h-5" />,
    description: '在算力紧缺时代，规划企业的计算生命线。',
    items: [
      { id: 'c1', text: '“自建 vs 托管”边界', subText: '核心模型训练必须掌握在自己手里，非敏感受理可上联邦云。', isDone: false },
      { id: 'c2', text: '三层算力架构', subText: '构建“开发（Notebook）- 训练（集群）- 推理（边缘）”的完整链路。', isDone: false },
      { id: 'c3', text: '能源成本测算', subText: '预估未来 3 年 GPU 能耗，提前布局电力与冷却资源。', isDone: false },
    ]
  },
  {
    id: 'process',
    title: '流程重构：AI 闭环',
    icon: <Workflow className="w-5 h-5" />,
    description: '复刻 DOE 的“数据 → 模型 → 实验”加速引擎。',
    items: [
      { id: 'p1', text: '确立“旗舰战场”', subText: '选定一个能产生立竿见影效果的场景（如新材料配方优化）。', isDone: false },
      { id: 'p2', text: '引入行业基础模型', subText: '不要只用通用 LLM，训练懂物理、懂化学的 Vertical AI。', isDone: false },
      { id: 'p3', text: '迈向“无人实验室”', subText: '推进设备联网与自动化，让 AI 能够直接指挥实验设备。', isDone: false },
    ]
  },
  {
    id: 'org',
    title: '组织治理：战时体制',
    icon: <Users className="w-5 h-5" />,
    description: '打破部门墙，建立适应 AI 速战速决的组织架构。',
    items: [
      { id: 'o1', text: '任命 AI 战时指挥官', subText: 'CAIO 需具备跨越技术与业务的调度权，直接向 CEO 汇报。', isDone: false },
      { id: 'o2', text: '跨部门作战室', subText: '研发、IT、法务每周联席会议，快速扫除落地障碍。', isDone: false },
      { id: 'o3', text: '重塑激励机制', subText: '明确 AI 辅助成果的 IP 归属，重奖“人机协同”的创新。', isDone: false },
    ]
  },
  {
    id: 'ecology',
    title: '生态合作：借船出海',
    icon: <Globe className="w-5 h-5" />,
    description: '积极挂靠 Genesis Mission 产业链与国家实验室资源。',
    items: [
      { id: 'e1', text: '对接国家级平台', subText: '用我们的独特数据换取国家实验室的顶级算力支持。', isDone: false },
      { id: 'e2', text: '锁定政策红利', subText: '紧盯 DOE 发布的项目清单，争取成为“AI+产业”示范点。', isDone: false },
      { id: 'e3', text: '实质性产学研', subText: '与高校建立联合实验室，共同开发行业专用模型。', isDone: false },
    ]
  },
  {
    id: 'risk',
    title: '风险合规：底线思维',
    icon: <ShieldAlert className="w-5 h-5" />,
    description: '在复杂的地缘政治与合规环境中穿行。',
    items: [
      { id: 'r1', text: '建立物理隔离带', subText: '严防敏感数据触网，确保核心资产符合国家安全标准。', isDone: false },
      { id: 'r2', text: '可解释性审计', subText: '关键决策不能只靠黑箱，必须建立 AI 决策的人工复核机制。', isDone: false },
      { id: 'r3', text: '地缘政策雷达', subText: '时刻关注出口管制清单变化，防止技术断供或合规踩雷。', isDone: false },
    ]
  },
];

// --- Components ---

const TrumpQuote = () => (
  <div className="relative max-w-4xl mx-auto my-12 p-8 bg-slate-50 border-l-4 border-amber-500 shadow-sm rounded-r-xl">
    <Quote className="absolute top-4 left-4 w-8 h-8 text-amber-200/50" />
    <blockquote className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed text-center px-4 italic">
      "We are launching the <span className="font-bold text-slate-900 not-italic">Genesis Mission</span>... It will be the greatest mobilization of American scientific talent since the Manhattan Project and the Apollo Program. We will double the pace of discovery and leave our competitors in the dust."
    </blockquote>
    <div className="mt-6 flex items-center justify-center gap-4">
      <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
      <div className="text-sm font-bold text-slate-900 uppercase tracking-widest">
        Donald J. Trump
      </div>
      <div className="w-12 h-1 bg-amber-500 rounded-full"></div>
    </div>
    <div className="text-center text-xs text-slate-500 mt-2 font-medium">
      47th President of the United States | November 24, 2025
    </div>
  </div>
);

const Hero = () => (
  <header className="relative bg-slate-900 text-white overflow-hidden pb-16 pt-20 px-6 md:px-12 lg:px-24 border-b-8 border-amber-500">
    {/* Abstract Background Elements */}
    <div className="absolute inset-0 z-0 opacity-20">
       <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-800 to-transparent"></div>
       <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm bg-blue-900/50 border border-blue-700/50 text-blue-100 text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-sm">
          <Globe2 className="w-4 h-4 text-amber-400" />
          The White House • Executive Order
        </div>
        <div className="hidden md:block text-amber-500/80 font-serif italic text-lg">
          "America First in AI"
        </div>
      </div>
      
      <div className="text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-lg">
          THE GENESIS <br />
          <span className="text-amber-400">MISSION</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl leading-relaxed mb-8 font-light border-l-4 border-amber-500 pl-6">
          这不是普通的科研拨款，这是一场<b>国家意志</b>驱动的算力与智力战争。
          <br/>
          目标只有一个：利用 AI + 超算，重塑美国在硬科技领域的绝对霸权。
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a href="#guide" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-sm shadow-lg shadow-amber-900/20 transition-all flex items-center gap-2 uppercase tracking-wide">
            企业作战指南 <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#intel" className="px-8 py-4 bg-transparent border-2 border-slate-600 hover:border-slate-400 text-slate-200 font-semibold rounded-sm transition-colors uppercase tracking-wide">
            深度情报分析
          </a>
        </div>
      </div>
    </div>
  </header>
);

const BriefingCard = ({ title, value, icon: Icon, delay }: { title: string, value: string, icon: any, delay: number }) => (
  <div className={`bg-white p-6 rounded-sm shadow-sm border-l-4 border-blue-900 hover:border-amber-500 transition-all duration-300 hover:shadow-lg group`}>
    <div className="flex items-start justify-between mb-4">
      <div className="p-2 bg-slate-100 rounded-sm text-slate-700 group-hover:text-blue-900 transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold text-slate-300 uppercase">CLASSIFIED</span>
    </div>
    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{title}</h3>
    <p className="text-lg font-bold text-slate-900 leading-snug font-serif">{value}</p>
  </div>
);

const BriefingSection = () => (
  <section id="intel" className="py-16 px-6 bg-slate-100 border-b border-slate-200">
    <div className="max-w-7xl mx-auto">
      <TrumpQuote />
      
      <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-200 pb-4">
        <FileText className="w-6 h-6 text-blue-900" />
        <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Mission Intelligence Brief / 任务简报</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BriefingCard 
          title="战略目标" 
          value="以举国之力，10年内让美国科研与工程效率翻倍" 
          icon={Rocket}
          delay={0}
        />
        <BriefingCard 
          title="执行核心" 
          value="美国能源部 (DOE) + 17 家国家实验室 + 4万名科学家" 
          icon={Users}
          delay={100}
        />
        <BriefingCard 
          title="技术引擎" 
          value="ASSP 平台：打通联邦数据、超算与科学模型的闭环" 
          icon={Cpu}
          delay={200}
        />
        <BriefingCard 
          title="竞争对手" 
          value="锁定半导体、生物、核能领域，全面对冲中国崛起" 
          icon={Globe}
          delay={300}
        />
      </div>
    </div>
  </section>
);

const PlatformVisual = () => (
  <section className="py-20 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-2 block">The Technical Engine</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
          ASSP: 美国科学与安全平台
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          不同于互联网时代的“应用层创新”，Genesis Mission 旨在打造一个<b>国家级的科学操作系统</b>。
          通过整合算力与数据，它将科研从“手工作坊”变为“自动化流水线”。
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto p-8 bg-slate-50 border border-slate-200 rounded-sm">
        {/* Connection Lines */}
        <div className="hidden lg:block absolute top-1/2 left-20 right-20 h-0.5 bg-slate-200 -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Node 1 */}
          <div className="relative bg-white p-8 border border-slate-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-sm shadow-lg">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900 text-center mb-3">1. 战略数据资产</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              整合联邦数十年的科研数据、专有实验数据与合成数据。这是训练科学大模型的“燃料”。
            </p>
          </div>

          {/* Node 2 */}
          <div className="relative bg-white p-8 border-t-4 border-amber-500 shadow-lg rounded-sm transform md:-translate-y-4">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-amber-500 text-slate-900 flex items-center justify-center rounded-sm shadow-lg">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="mt-8 text-xl font-bold text-slate-900 text-center mb-3">2. 科学基础模型</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              针对核物理、生物医药、新材料等垂直领域的专用 Foundation Models。不仅懂语言，更懂自然规律。
            </p>
          </div>

          {/* Node 3 */}
          <div className="relative bg-white p-8 border border-slate-200 shadow-sm rounded-sm hover:shadow-md transition-shadow">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-sm shadow-lg">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900 text-center mb-3">3. 自动化实验室</h3>
            <p className="text-sm text-slate-500 text-center leading-relaxed">
              Self-driving Labs。AI 设计实验 -> 机器人执行 -> 结果自动回馈。24/7 不停歇的科学发现机器。
            </p>
          </div>
        </div>

         <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold border border-blue-100">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              闭环效应：数据生成速度提升 100x，模型迭代周期缩短至数天
            </div>
         </div>
      </div>
    </div>
  </section>
);

const EnterpriseGuide = () => {
  const [activeTab, setActiveTab] = useState<string>('strategy');
  const [checklist, setChecklist] = useState<StrategySection[]>(STRATEGY_DATA);

  const activeSection = checklist.find(s => s.id === activeTab);

  const toggleItem = (itemId: string) => {
    setChecklist(prev => prev.map(section => ({
      ...section,
      items: section.items.map(item => 
        item.id === itemId ? { ...item, isDone: !item.isDone } : item
      )
    })));
  };

  const calculateProgress = (items: ChecklistItem[]) => {
    const done = items.filter(i => i.isDone).length;
    return Math.round((done / items.length) * 100);
  };

  return (
    <section id="guide" className="py-20 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-blue-900 font-bold tracking-widest text-sm uppercase mb-2 block">Actionable Intelligence</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">企业战术手册</h2>
            <p className="text-slate-600 mt-2 max-w-xl">
              在这个“国家队入场”的时代，企业不能再单打独斗。请根据以下 7 大维度，自查企业的战略对齐度。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
          
          {/* Left Navigation */}
          <div className="lg:col-span-4 bg-white rounded-sm shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
            <div className="p-4 border-b border-slate-100 bg-slate-900 text-white">
              <h3 className="font-bold uppercase tracking-wide text-sm flex items-center gap-2">
                <Workflow className="w-4 h-4 text-amber-400" /> 战略支柱导航
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 bg-slate-50">
              {checklist.map((section) => {
                const progress = calculateProgress(section.items);
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center p-4 rounded-sm transition-all border-l-4 ${
                      isActive
                        ? 'bg-white border-amber-500 shadow-sm' 
                        : 'border-transparent hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <div className={`mr-3 ${isActive ? 'text-blue-900' : 'text-slate-400'}`}>
                      {section.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-bold text-sm ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {section.title}
                      </div>
                    </div>
                    {progress > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-500'}`}>
                        {progress}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Visualization Area */}
            <div className="h-64 border-t border-slate-200 p-4 bg-white hidden md:block">
              <p className="text-xs font-bold text-slate-400 mb-2 uppercase text-center tracking-wider">战略准备度雷达</p>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="当前评分"
                    dataKey="A"
                    stroke="#b45309"
                    strokeWidth={2}
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #f59e0b', borderRadius: '0px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 bg-white rounded-sm shadow-lg border border-slate-200 flex flex-col h-full overflow-hidden relative">
            {/* Background Seal */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <Rocket className="w-96 h-96 text-slate-900" />
             </div>

            {activeSection && (
              <>
                <div className="p-8 border-b border-slate-100 bg-slate-50 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-900 text-white rounded-sm shadow-sm">
                      {activeSection.icon}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900">{activeSection.title}</h3>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed mt-2 border-l-2 border-amber-500 pl-4 bg-white/50 py-2">
                    {activeSection.description}
                  </p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 bg-white relative z-10">
                  <div className="space-y-4">
                    {activeSection.items.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => toggleItem(item.id)}
                        className={`group flex items-start gap-4 p-5 rounded-sm border-2 transition-all cursor-pointer ${
                          item.isDone 
                            ? 'bg-blue-50/30 border-blue-900/20' 
                            : 'bg-white border-slate-100 hover:border-amber-400 hover:shadow-md'
                        }`}
                      >
                        <div className={`mt-1 transition-colors ${item.isDone ? 'text-blue-900' : 'text-slate-300 group-hover:text-amber-500'}`}>
                          {item.isDone ? <CheckCircle2 className="w-6 h-6 fill-blue-100" /> : <Circle className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className={`text-lg font-bold mb-1 transition-colors ${item.isDone ? 'text-blue-900 line-through decoration-amber-500 decoration-2' : 'text-slate-800'}`}>
                            {item.text}
                          </h4>
                          <p className={`text-sm leading-relaxed ${item.isDone ? 'text-blue-900/50' : 'text-slate-500'}`}>
                            {item.subText}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 bg-slate-900 text-slate-300 rounded-sm border border-slate-800 shadow-inner">
                    <h5 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> 战略建议 / Strategic Advisory
                    </h5>
                    <p className="text-sm leading-relaxed">
                      完成上述自查后，建议企业立即启动<strong>数据资产盘点</strong>。在 Genesis Mission 的框架下，数据将取代土地与劳动力，成为企业参与国家级供应链的最核心筹码。
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const RiskDetailRow = ({ title, context, mitigation, icon: Icon }: { title: string, context: string, mitigation: string, icon: any }) => (
  <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 p-6 border-b border-slate-200 hover:bg-slate-50 transition-colors last:border-0">
    <div className="md:col-span-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
        <Icon className="w-5 h-5 text-amber-600" />
        {title}
      </div>
      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase w-fit rounded-sm">High Risk</span>
    </div>
    <div className="md:col-span-4">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Context / 背景</h4>
      <p className="text-slate-700 text-sm leading-relaxed">{context}</p>
    </div>
    <div className="md:col-span-5">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Action / 应对</h4>
      <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-blue-900 pl-3">{mitigation}</p>
    </div>
  </div>
);

const DetailedRiskSection = () => (
  <section className="py-20 px-6 bg-white border-t border-slate-200">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center md:text-left">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest mb-4">
          <AlertTriangle className="w-3 h-3" /> Red Lines & Geopolitics
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
          全球背景与核心风险简报
        </h2>
        <p className="text-slate-600 max-w-3xl text-lg">
          Genesis Mission 不仅仅是一项科研计划，它是中美科技冷战背景下的核心战略部署。
          企业在享受政策红利的同时，必须时刻警惕脚下的“地缘政治地雷”。
        </p>
      </div>

      <div className="bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-sm overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <span className="font-mono text-sm tracking-widest text-amber-500">CONFIDENTIAL // INDUSTRIAL USE ONLY</span>
          <Globe2 className="w-5 h-5 text-slate-400" />
        </div>

        {/* Content Rows */}
        <div className="divide-y divide-slate-200">
          <RiskDetailRow 
            title="数据主权与出境"
            icon={Globe}
            context="行政令明确要求建立“安全”的数据环境。涉及基因、关键材料、地质信息的科研数据，若存储在境外服务器或通过公网传输，将面临极高的联邦审查风险。"
            mitigation="建立“物理隔离”的数据保管箱。对于必须与海外分支机构共享的数据，需经过法务部门的合规脱敏，并签署严格的出口管制合规声明。"
          />
          
          <RiskDetailRow 
            title="供应链断供风险"
            icon={Lock}
            context="随着 DOE 牵头整合算力，高端 GPU 和专用 AI 芯片将优先供给 Genesis Mission 合作伙伴。非战略相关企业可能面临“算力挤出”效应。"
            mitigation="不要把鸡蛋放在一个篮子里。储备至少 6-12 个月的算力冗余，同时测试国产算力或非受限芯片的替代方案，制定“B计划”技术栈。"
          />
          
          <RiskDetailRow 
            title="算法审计与黑箱"
            icon={Gavel}
            context="政府资金支持的项目将面临更严格的审计。如果你的 AI 模型无法解释其决策逻辑（如新药筛选原因），可能无法通过 FDA 或 DOE 的验收。"
            mitigation="投资可解释性 AI (XAI) 工具。保留所有训练数据快照和参数日志。对于关键决策，必须保留“人在回路 (Human-in-the-loop)”的复核机制。"
          />
        </div>

        {/* Summary Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
             <h4 className="font-bold text-slate-900 mb-1">最终研判 / Final Verdict</h4>
             <p className="text-sm text-slate-600">
               未来 5-10 年，科研与高端制造的竞争核心就是<strong>“谁能更快跑通 AI 闭环”</strong>。
               企业应放弃幻想，主动对标国家标准，将自身嵌入 Genesis Mission 的生态位中。
             </p>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors uppercase tracking-wider">
            下载完整合规白皮书
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t-4 border-amber-500">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold font-serif">G</div>
          <h3 className="text-white font-serif font-bold text-xl tracking-wide">Genesis Mission Playbook</h3>
        </div>
        <p className="text-sm leading-relaxed max-w-sm text-slate-500 mb-6">
          本页面旨在解析特朗普政府《启动创世使命》行政令对产业界的深远影响。
          内容基于公开行政令文本、白宫简报及行业智库分析整理。
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
            <span className="font-bold text-white">X</span>
          </div>
          <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
            <span className="font-bold text-white">in</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">相关联邦资源</h4>
        <ul className="space-y-4 text-sm">
          <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
            <ArrowRight className="w-3 h-3" /> DOE AI Office
          </li>
          <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
            <ArrowRight className="w-3 h-3" /> White House OSTP
          </li>
          <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
            <ArrowRight className="w-3 h-3" /> National Science Foundation
          </li>
          <li className="hover:text-amber-400 cursor-pointer transition-colors flex items-center gap-2">
            <ArrowRight className="w-3 h-3" /> NIST AI Risk Management
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">法律声明</h4>
        <ul className="space-y-4 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors">隐私政策 (Privacy Policy)</li>
          <li className="hover:text-white cursor-pointer transition-colors">使用条款 (Terms of Use)</li>
          <li className="hover:text-white cursor-pointer transition-colors">免责声明 (Disclaimer)</li>
        </ul>
        <div className="mt-8 pt-8 border-t border-slate-800 text-xs text-slate-600">
          &copy; 2025 Strategic Industrial Research. <br/>All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Hero />
      
      <main className="flex-grow">
        <BriefingSection />
        <PlatformVisual />
        <EnterpriseGuide />
        <DetailedRiskSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
