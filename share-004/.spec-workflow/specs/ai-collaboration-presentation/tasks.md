# Tasks Document

## 阶段一：技术基础框架搭建

- [ ] 1. 创建基础HTML框架和技术环境
  - File: index.html, styles/main.css, scripts/app.js
  - 配置fullpage.js、TailwindCSS、ECharts等CDN依赖
  - 实现Aurora渐变背景和特斯拉红#E31937配色系统
  - 设置基础页面模板和导航结构
  - Purpose: 建立完整的技术基础设施
  - _Leverage: PPT要求.md技术规范_
  - _Requirements: 1.1, 2.1, 2.2_
  - _Prompt: Role: Frontend Infrastructure Developer with expertise in modern web frameworks | Task: Create complete technical foundation with fullpage.js, TailwindCSS, ECharts setup and Aurora gradient theme following requirements 1.1, 2.1, 2.2 | Restrictions: Must use exact CDN versions and color codes, ensure cross-browser compatibility, maintain performance | Success: Framework loads correctly, gradients render smoothly, navigation works flawlessly_

## 阶段二：PPT内容页面制作（按实际PPT逻辑分页）

- [ ] 2. 开场部分制作（共5页）
  - File: pages/opening.html, data/opening.json
  - **第1页**: 标题页「AI协作能力：大学生未来发展的新维度」
  - **第2页**: 分享目的（3个要点在一页）
  - **第3页**: 自我介绍-四重身份
  - **第4页**: 自我介绍-华库律所介绍
  - **第5页**: 普通学长+证件照片+莞工情怀
  - Purpose: 完成演讲开场和个人介绍
  - _Leverage: imgs/证件.png_
  - _Requirements: 4.1_
  - _Prompt: Role: Content Designer specializing in presentation opening and personal branding | Task: Create 5 opening pages including title, purpose, and personal introduction following requirement 4.1, maintaining professional yet engaging tone | Restrictions: Must preserve all original content, ensure imgs/证件.png displays correctly, maintain visual hierarchy | Success: Opening creates strong first impression, content flows naturally, images load properly_

- [ ] 3. 互动破冰部分制作（共3页）
  - File: pages/interaction.html, data/interaction.json
  - **第6页**: 外币识别游戏介绍+挑战说明
  - **第7页**: 外币揭秘答案展示  
  - **第8页**: 互动提问环节
  - Purpose: 创建观众互动和参与环节
  - _Leverage: imgs/外币.png, imgs/外币揭秘.png_
  - _Requirements: 4.1_
  - _Prompt: Role: Interactive Experience Designer with expertise in audience engagement | Task: Create 3 interactive pages for currency game and audience participation following requirement 4.1, maintaining engagement flow | Restrictions: Must include all game elements and images, preserve interactive nature, ensure images display correctly | Success: Interactive elements are engaging, game flow is clear, audience participation is encouraged_

- [ ] 4. AI时代关系分析制作（共2页）
  - File: pages/ai-era.html, data/ai-era.json
  - **第9页**: "AI时代，跟我们学生有什么关系？"章节标题
  - **第10页**: 传统学习 vs AI协作对比表格
  - Purpose: 展示AI与传统方式的核心差异
  - _Leverage: 原markdown中的完整对比表格_
  - _Requirements: 4.1, 5.1_
  - _Prompt: Role: Data Presentation Specialist with expertise in comparative visualization | Task: Create 2 pages showing AI era relevance and comparison table following requirements 4.1 and 5.1, making data easily digestible | Restrictions: Must preserve exact table structure and all data points, ensure mobile readability | Success: Comparison is visually clear, data is compelling, table renders perfectly_

- [ ] 5. AI学习工具链演示制作（共5页）
  - File: pages/toolchain.html, data/toolchain.json
  - **第11页**: AI学习工具链章节介绍
  - **第12页**: Step 1 - Perplexity极速调研（功能+优势+截图）
  - **第13页**: Step 1 - BiliNote视频知识提取（功能+优势+截图）
  - **第14页**: Step 2 - NotebookLM多源整合（功能+截图+AI播客）
  - **第15页**: Step 3 - GitMind可视化（功能+截图）
  - **第16页**: Step 4 - Obsidian完整笔记（功能+知识图谱截图）
  - Purpose: 详细展示4步AI学习工具链的完整流程
  - _Leverage: imgs/Perplexity搜索界面截图.png, imgs/BiliNote界面和生成结果.png, imgs/NotebookLM学习笔记.png, imgs/NotebookLM的AI播客功能.png, imgs/GitMind思维导图生成过程.png, imgs/GitMind学习流程图.png, imgs/Obsidian知识图谱构建.png_
  - _Requirements: 4.1, 5.1_
  - _Prompt: Role: Technical Content Creator with expertise in tool demonstration and workflow visualization | Task: Create 6 pages showcasing complete AI learning toolchain following requirements 4.1 and 5.1, integrating all screenshots and maintaining workflow clarity | Restrictions: Must include ALL mentioned screenshots, preserve step-by-step workflow, ensure all external links work | Success: Toolchain is clearly explained, workflow is easy to follow, all images enhance understanding_

- [ ] 6. AI协作实战故事制作（共8页）
  - File: pages/stories.html, data/stories.json
  - **第17页**: "我的AI协作故事"章节介绍
  - **第18页**: 模拟法庭-基本案情介绍
  - **第19页**: 模拟法庭-传统做法vs AI赋能对比+7.4万字成果
  - **第20页**: 小说创作-易经64卦构思+创作奇迹（一周完成）
  - **第21页**: 小说创作-历次分享回顾+质量追求
  - **第22页**: AI医疗应用-零编程临床医师挑战
  - **第23页**: AI医疗应用-PromptX AI专家团队解决方案
  - **第24页**: AI医疗应用-效率翻倍成果（3个月→1周）
  - Purpose: 展示AI在法律、文学、医疗三个领域的实际应用案例
  - _Leverage: imgs/模拟法庭.png, imgs/0、第一版.jpg, imgs/0、第二版.jpg, imgs/px医学应用.png, imgs/px医学应用1.png, imgs/px医学应用2.png_
  - _Requirements: 4.1_
  - _Prompt: Role: Case Study Specialist with expertise in multi-domain application showcases | Task: Create 8 pages covering legal, literary, and medical AI applications following requirement 4.1, maintaining credibility and impact | Restrictions: Must preserve all quantitative results (7.4万字, 3个月→1周等), include all specified images, maintain professional credibility | Success: Stories are compelling and credible, quantitative impacts are highlighted, images support narratives effectively_

- [ ] 7. 文科生AI优势分析制作（共6页）
  - File: pages/liberal-arts.html, data/liberal-arts.json
  - **第25页**: "AI是理工科的事情吗？"章节标题+答案
  - **第26页**: 文科生大舞台章节介绍
  - **第27页**: Q1-为什么纯技术手段无法解决AI根本问题（哲学本源问题）
  - **第28页**: Q2-构建AI认知系统需要的文科专业知识
  - **第29页**: Q3-文科生在AI发展中的独特角色
  - **第30页**: 总结-文科生是AI认知革命的领路人
  - Purpose: 阐述文科生在AI时代的独特价值和优势
  - _Leverage: 原文中的哲学理论和案例分析_
  - _Requirements: 4.1_
  - _Prompt: Role: Educational Content Designer with expertise in interdisciplinary analysis | Task: Create 6 pages highlighting liberal arts advantages in AI development following requirement 4.1, maintaining academic rigor | Restrictions: Must preserve all philosophical concepts and theories, maintain logical argument flow, ensure accessibility | Success: Arguments are compelling and well-structured, academic content is accessible, philosophical concepts are clear_

- [ ] 8. 理性分析深度内容制作（共16页）
  - File: pages/analysis.html, data/analysis.json
  - **第31页**: "理性分析-重新认识人机关系"章节标题
  - **第32页**: 三大疑问自然浮现（AI价值、替代关系、未来人才）
  - **第33页**: 认识AI-核心概念（超级聪明的文字游戏高手）
  - **第34页**: AIGC概念解释和突破意义
  - **第35页**: AI软件架构（心脏+外衣公式和对比表）
  - **第36页**: Agent概念和公式（LLM+Memory+Planning+Tool Use）
  - **第37页**: AI工作原理-三种学习方式对比
  - **第38页**: AI独特思考方式-统计智慧的力量
  - **第39页**: AI优势与局限分析
  - **第40页**: 人机协作的完美互补
  - **第41页**: 提示词工程-与AI高效沟通的艺术
  - **第42页**: 提示词核心结构和六大技巧
  - **第43页**: 实战案例对比（普通vs优质提示词）
  - **第44页**: 三角协作关系-人类生态位
  - **第45页**: 三角协作关系-AI和计算机生态位
  - **第46页**: 回答三大疑问的核心洞察
  - Purpose: 提供AI理论分析和方法指导的完整体系
  - _Leverage: 原文中的理论框架、表格和公式_
  - _Requirements: 4.1_
  - _Prompt: Role: Educational Content Architect with expertise in complex theory visualization | Task: Create 16 pages covering comprehensive AI analysis following requirement 4.1, transforming complex concepts into digestible presentation format | Restrictions: Must preserve all theoretical accuracy, maintain logical progression, ensure concepts are visually clear | Success: Complex theories are well-explained, logical flow is maintained, content is educational and engaging_

- [ ] 9. 人机协作关系深入分析制作（共8页）
  - File: pages/collaboration.html, data/collaboration.json
  - **第47页**: 协作成功的关键原则
  - **第48页**: 深度协作的三个层次
  - **第49页**: 疑问一解答-AI强大vs人类价值
  - **第50页**: 疑问二解答-替代关系vs工作模式升级
  - **第51页**: 疑问三解答-未来人才核心竞争力
  - **第52页**: 核心价值公式（专业能力×AI协作能力×人文素养）
  - **第53页**: 三大核心洞察
  - **第54页**: 最终目标-让AI成为超级助手
  - Purpose: 深入分析人机协作的本质和未来发展
  - _Leverage: 原文中的协作理论和价值公式_
  - _Requirements: 4.1_
  - _Prompt: Role: Strategic Content Analyst with expertise in future work trends | Task: Create 8 pages covering human-AI collaboration models following requirement 4.1, presenting strategic insights in visual format | Restrictions: Must preserve all formulas and frameworks, maintain strategic depth, ensure practical applicability | Success: Collaboration models are clear, future trends are well-articulated, insights are actionable_

- [ ] 10. 实践方法和工具介绍制作（共8页）
  - File: pages/practice.html, data/practice.json
  - **第55页**: "实践方法-从理论到实践的轻松跨越"章节标题
  - **第56页**: 面对这么多知识，从哪里开始实践？
  - **第57页**: 两种实践路径对比
  - **第58页**: PromptX专业AI角色生成系统介绍
  - **第59页**: DPML协议四个维度详解
  - **第60页**: 法律顾问角色举例说明
  - **第61页**: 现场体验环节设置
  - **第62页**: 效果展示和心态转变
  - Purpose: 介绍具体的AI协作工具和实践方法
  - _Leverage: PromptX相关内容和外部链接_
  - _Requirements: 4.1_
  - _Prompt: Role: Product Demonstration Specialist with expertise in tool presentation | Task: Create 8 pages showcasing PromptX and practical methods following requirement 4.1, maintaining credibility and engagement | Restrictions: Must accurately represent PromptX capabilities, preserve all technical details, maintain professional credibility | Success: Tool presentation is compelling, technical concepts are accessible, demonstration value is clear_

- [ ] 11. 深度实践团队和生态介绍制作（共8页）
  - File: pages/deepractice.html, data/deepractice.json
  - **第63页**: "深度实践-构建AI时代的智能协作新生态"章节标题
  - **第64页**: 深度实践理念和使命（让AI触手可及）
  - **第65页**: 创始人姜山(Sean)介绍
  - **第66页**: 团队优势（技术实力、行业经验、创新能力）
  - **第67页**: PromptX项目详细介绍
  - **第68页**: 项目成果（2.7K+ GitHub Stars等）
  - **第69页**: 其他内容平台（社区论坛、播客、B站）
  - **第70页**: 完整生态系统展示
  - Purpose: 介绍项目团队和完整生态平台
  - _Leverage: 深度实践相关内容和各平台链接_
  - _Requirements: 4.1_
  - _Prompt: Role: Corporate Presentation Designer with expertise in team and ecosystem showcases | Task: Create 8 pages covering Deepractice.ai team and ecosystem following requirement 4.1, maintaining professional credibility | Restrictions: Must accurately represent team credentials, preserve all platform links, maintain professional tone | Success: Team presentation is credible, ecosystem is comprehensive, community value is evident_

- [ ] 12. 结尾和互动部分制作（共4页）
  - File: pages/closing.html, data/closing.json
  - **第71页**: 快问快答互动环节
  - **第72页**: Q&A环节设置
  - **第73页**: 本人联系方式（手机+二维码）
  - **第74页**: 结束语"从今天开始，让AI成为你的超能力！"
  - Purpose: 完成演讲收尾和联系信息展示
  - _Leverage: imgs/二维码.jpg_
  - _Requirements: 4.1_
  - _Prompt: Role: Presentation Closure Specialist with expertise in memorable endings | Task: Create 4 closing pages including interaction and contact information following requirement 4.1, ensuring strong conclusion | Restrictions: Must include all contact details, preserve QR code image, create impactful closing message | Success: Conclusion is memorable, contact information is clear and accessible_

## 阶段三：技术增强和优化

- [ ] 13. ECharts图表集成和数据可视化
  - File: scripts/charts.js, data/charts.json
  - 为对比表格创建可视化图表
  - 为工具链流程创建流程图
  - 为协作关系创建三角关系图
  - 配置黑红主题和响应式设计
  - Purpose: 增强数据展示和理论解释的视觉效果
  - _Leverage: ECharts 5, 原有表格和流程数据_
  - _Requirements: 5.1, 5.2_
  - _Prompt: Role: Data Visualization Expert with expertise in ECharts and custom theming | Task: Create interactive charts and diagrams following requirements 5.1 and 5.2, implementing black-red theme | Restrictions: Must maintain data accuracy, ensure mobile responsiveness, use exact theme colors | Success: Charts enhance understanding, visualizations are engaging, theme integration is seamless_

- [ ] 14. 交互功能和动画系统集成
  - File: scripts/animations.js, scripts/navigation.js
  - 实现Apple风格页面切换动画
  - 配置快捷键导航和页码指示
  - 添加触摸手势支持
  - 优化响应式适配
  - Purpose: 提供流畅的交互体验和专业动画效果
  - _Leverage: fullpage.js, CSS3动画_
  - _Requirements: 3.1, 3.2, 6.1_
  - _Prompt: Role: Interaction Designer with expertise in premium animations | Task: Implement Apple-style animations and navigation following requirements 3.1, 3.2, 6.1, ensuring 60fps performance | Restrictions: Must maintain 60fps, ensure intuitive touch gestures, optimize for all screen sizes | Success: Animations are smooth and premium, navigation is intuitive, cross-device experience is consistent_

- [ ] 15. 最终测试、优化和部署准备
  - File: tests/integration.js, docs/README.md, docs/deployment.md
  - 执行74页完整PPT流程测试
  - 验证所有图片、链接、动画的功能性
  - 创建项目文档和部署说明
  - 性能优化和跨浏览器兼容性确认
  - Purpose: 确保项目质量和生产环境可部署性
  - _Leverage: 所有组件和内容页面_
  - _Requirements: 所有Requirements_
  - _Prompt: Role: QA Engineer and Technical Writer with expertise in comprehensive testing | Task: Perform complete testing of all 74 pages and create deployment documentation covering all requirements | Restrictions: Must test every page and interaction, verify all 13 images load correctly, ensure cross-browser compatibility | Success: All 74 pages work perfectly, all images and links functional, performance meets requirements, deployment is streamlined_