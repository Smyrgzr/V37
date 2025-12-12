import svgPaths from "./svg-kws5rqfffd";

function Sidebar() {
  return (
    <div className="h-[993px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[993px] w-[256px]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[30px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">Customer Hub</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Manage B2B companies, B2C customers, and analyze segments</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[54px] relative shrink-0 w-[465.148px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[54px] items-start relative w-[465.148px]">
        <Heading2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 5.33333V9.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 7.33333H10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#030213] h-[36px] relative rounded-[8px] shrink-0 w-[150.68px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[150.68px]">
        <Icon />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[44px] not-italic text-[14px] text-nowrap text-white top-[8.5px] tracking-[-0.1504px] whitespace-pre">Add Customer</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[54px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[59.58px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3baa1080} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="[grid-area:1_/_1] h-[29px] relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon1 />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[89.58px] not-italic text-[14px] text-neutral-950 text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[49.46px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24682)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24682">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="[grid-area:1_/_2] bg-white h-[29px] relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon2 />
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[79.46px] not-italic text-[14px] text-neutral-950 text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">Segmentation</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[448px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[36px] px-[3px] py-[3.5px] relative w-[448px]">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100.039px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[100.039px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Segments</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2059)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2059">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[52px] relative shrink-0 w-[342px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[342px]">
        <CardTitle />
        <Icon3 />
      </div>
    </div>
  );
}

function CustomerHub() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">10</p>
    </div>
  );
}

function CustomerHub1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Active customer groups</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[342px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start px-[24px] py-0 relative w-[342px]">
        <CustomerHub />
        <CustomerHub1 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <CardContent />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[105.219px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[105.219px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Customers</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="h-[52px] relative shrink-0 w-[342px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[342px]">
        <CardTitle1 />
        <Icon4 />
      </div>
    </div>
  );
}

function CustomerHub2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">6,877</p>
    </div>
  );
}

function CustomerHub3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Across all segments</p>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[342px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start px-[24px] py-0 relative w-[342px]">
        <CustomerHub2 />
        <CustomerHub3 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader1 />
      <CardContent1 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[117.023px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[117.023px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Segment Revenue</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 1.33333V14.6667" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5120400} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="h-[52px] relative shrink-0 w-[342px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[342px]">
        <CardTitle2 />
        <Icon5 />
      </div>
    </div>
  );
}

function CustomerHub4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[87px]">$2463K</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[12px] top-[3.34px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M8 3.5H11V6.5" id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3a7e7417} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <Icon6 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[12px] not-italic text-[#00a63e] text-[12px] top-px w-[111px]">+13.7% avg growth</p>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[342px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start px-[24px] py-0 relative w-[342px]">
        <CustomerHub4 />
        <CustomerHub5 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader2 />
      <CardContent2 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[52.172px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[52.172px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Avg LTV</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2098)" id="Icon">
          <path d={svgPaths.p2d09d900} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2098">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="h-[52px] relative shrink-0 w-[342px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[342px]">
        <CardTitle3 />
        <Icon7 />
      </div>
    </div>
  );
}

function CustomerHub6() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[58px]">$358</p>
    </div>
  );
}

function CustomerHub7() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Lifetime value per customer</p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[342px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-full items-start px-[24px] py-0 relative w-[342px]">
        <CustomerHub6 />
        <CustomerHub7 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_4] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader3 />
      <CardContent3 />
    </div>
  );
}

function CustomerHub8() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[154px] relative shrink-0 w-full" data-name="CustomerHub">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_16055_2090)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2090">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[240.062px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[240.062px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Segment Performance Highlights</p>
      </div>
    </div>
  );
}

function CustomerHub9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[1372px]" data-name="CustomerHub">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center relative w-[1372px]">
        <Icon8 />
        <CardTitle4 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Highest Value</p>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2fc87200} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 14H12.6667" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[95.469px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">VIP Customers</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon9 />
      <Text />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[449.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Fastest Growing</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[101.266px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Corporate/Fleet</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Text1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-[461.33px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[449.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Largest Segment</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b6ee540} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[117.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[117.969px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Budget Conscious</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon11 />
      <Text2 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-[922.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[449.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Highest Risk</p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p293dc0c0} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[120.766px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">At-Risk Customers</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon12 />
      <Text3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-[78px] w-[449.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Best Retention</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pb3a1300} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[104.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[104.227px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Active Members</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon13 />
      <Text4 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-[461.33px] pb-px pt-[13px] px-[13px] rounded-[10px] top-[78px] w-[449.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Needs Attention</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p39fa6bc0} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[120.766px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">At-Risk Customers</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon14 />
      <Text5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[4px] h-[66px] items-start left-[922.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-[78px] w-[449.336px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container17 />
      <Container18 />
    </div>
  );
}

function CustomerHub10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1372px]" data-name="CustomerHub">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[1372px]">
        <Container4 />
        <Container7 />
        <Container10 />
        <Container13 />
        <Container16 />
        <Container19 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-[rgba(3,2,19,0.05)] h-[246px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(3,2,19,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] h-[246px] items-start pl-[26px] pr-[2px] py-[26px] relative w-full">
          <CustomerHub9 />
          <CustomerHub10 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p19cc0740} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 17.5H15.8333" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(173,70,255,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon15 />
      </div>
    </div>
  );
}

function CardTitle5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[107.273px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">VIP Customers</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[67.383px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[67.383px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">revenue</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle5 />
        <Badge />
      </div>
    </div>
  );
}

function CustomerHub11() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[167.273px]" data-name="CustomerHub">
      <Container20 />
      <Container21 />
    </div>
  );
}

function CustomerHub12() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">High-value customers with lifetime spend over $1,000</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.789px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.789px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">342</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container23() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[393.411px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.67px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[73px]">5.0% of total</p>
    </div>
  );
}

function CustomerHub13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container22 />
      <PrimitiveDiv />
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[43px]">$457K</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[41px]">$1335</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function CustomerHub14() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container27 />
      <Container30 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[48px]">+12.5%</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[67.984px]">
        <Icon16 />
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub15() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container31 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon17 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub16() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button1 />
      <Button2 />
    </div>
  );
}

function CardContent4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub12 />
      <CustomerHub13 />
      <CustomerHub14 />
      <CustomerHub15 />
      <CustomerHub16 />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:1_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub11 />
      <CardContent4 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p46c6e00} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(0,201,80,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon18 />
      </div>
    </div>
  );
}

function CardTitle6() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[117.141px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Active Members</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[69.617px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[69.617px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">lifecycle</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle6 />
        <Badge1 />
      </div>
    </div>
  );
}

function CustomerHub17() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[177.141px]" data-name="CustomerHub">
      <Container32 />
      <Container33 />
    </div>
  );
}

function CustomerHub18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers with active memberships and regular visits</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[20px] relative shrink-0 w-[35.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[35.375px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">2,100</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container35() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv1() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[287.579px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container35 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.12px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[80px]">30.5% of total</p>
    </div>
  );
}

function CustomerHub19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container34 />
      <PrimitiveDiv1 />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[44px]">$892K</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[35px]">$425</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container40 />
      <Container41 />
    </div>
  );
}

function CustomerHub20() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container39 />
      <Container42 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[49px]">+18.3%</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[68.359px]">
        <Icon19 />
        <Text12 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub21() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container43 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon20 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub22() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button3 />
      <Button4 />
    </div>
  );
}

function CardContent5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub18 />
      <CustomerHub19 />
      <CustomerHub20 />
      <CustomerHub21 />
      <CustomerHub22 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:1_/_2] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub17 />
      <CardContent5 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p32d5d880} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="bg-[rgba(251,44,54,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon21 />
      </div>
    </div>
  );
}

function CardTitle7() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[135.625px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">At-Risk Customers</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle7 />
        <Badge2 />
      </div>
    </div>
  );
}

function CustomerHub23() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[195.625px]" data-name="CustomerHub">
      <Container44 />
      <Container45 />
    </div>
  );
}

function CustomerHub24() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">{`Previously active customers who haven't visited in 60+ days`}</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.477px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.477px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">487</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Container47() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pr-[384.682px] py-0 relative w-full">
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.02px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[69px]">7.1% of total</p>
    </div>
  );
}

function CustomerHub25() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container46 />
      <PrimitiveDiv2 />
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[36px]">$99K</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[34px]">$202</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container52 />
      <Container53 />
    </div>
  );
}

function CustomerHub26() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container51 />
      <Container54 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f7f3780} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa1bcac0} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#e7000b] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[40px]">-8.2%</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[20px] relative shrink-0 w-[59.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[59.602px]">
        <Icon22 />
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub27() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container55 />
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon23 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub28() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button5 />
      <Button6 />
    </div>
  );
}

function CardContent6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub24 />
      <CustomerHub25 />
      <CustomerHub26 />
      <CustomerHub27 />
      <CustomerHub28 />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:1_/_3] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub23 />
      <CardContent6 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15.8333 6.66667V11.6667" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 9.16667H13.3333" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon24 />
      </div>
    </div>
  );
}

function CardTitle8() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[115.453px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">New Customers</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[69.617px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[69.617px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">lifecycle</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle8 />
        <Badge3 />
      </div>
    </div>
  );
}

function CustomerHub29() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[175.453px]" data-name="CustomerHub">
      <Container56 />
      <Container57 />
    </div>
  );
}

function CustomerHub30() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers who joined in the last 30 days</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.43px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.43px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">523</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text18 />
      <Text19 />
    </div>
  );
}

function Container59() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv3() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[382.515px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.06px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[71px]">7.6% of total</p>
    </div>
  );
}

function CustomerHub31() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container58 />
      <PrimitiveDiv3 />
      <Container60 />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[36px]">$45K</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container61 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[27px]">$86</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function CustomerHub32() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container63 />
      <Container66 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[48px]">+24.1%</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[67.891px]">
        <Icon25 />
        <Text20 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub33() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container67 />
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon26 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub34() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button7 />
      <Button8 />
    </div>
  );
}

function CardContent7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub30 />
      <CustomerHub31 />
      <CustomerHub32 />
      <CustomerHub33 />
      <CustomerHub34 />
    </div>
  );
}

function Card8() {
  return (
    <div className="[grid-area:2_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub29 />
      <CardContent7 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p273fb420} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="bg-[rgba(255,105,0,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon27 />
      </div>
    </div>
  );
}

function CardTitle9() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[111.281px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Frequent Users</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container69() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle9 />
        <Badge4 />
      </div>
    </div>
  );
}

function CustomerHub35() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[171.281px]" data-name="CustomerHub">
      <Container68 />
      <Container69 />
    </div>
  );
}

function CustomerHub36() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers with 10+ bookings, high engagement</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[26.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[26.063px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">856</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Container71() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv4() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] h-[8px] relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pr-[362.468px] py-0 relative w-full">
          <Container71 />
        </div>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.77px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[79px]">12.4% of total</p>
    </div>
  );
}

function CustomerHub37() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container70 />
      <PrimitiveDiv4 />
      <Container72 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[44px]">$235K</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[33px]">$274</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function CustomerHub38() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container75 />
      <Container78 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[48px]">+15.7%</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[20px] relative shrink-0 w-[67.195px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[67.195px]">
        <Icon28 />
        <Text24 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub39() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container79 />
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon29 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub40() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button9 />
      <Button10 />
    </div>
  );
}

function CardContent8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub36 />
      <CustomerHub37 />
      <CustomerHub38 />
      <CustomerHub39 />
      <CustomerHub40 />
    </div>
  );
}

function Card9() {
  return (
    <div className="[grid-area:2_/_2] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub35 />
      <CardContent8 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #0092B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #0092B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container80() {
  return (
    <div className="bg-[rgba(0,184,219,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon30 />
      </div>
    </div>
  );
}

function CardTitle10() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[132.57px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Budget Conscious</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container81() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle10 />
        <Badge5 />
      </div>
    </div>
  );
}

function CustomerHub41() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[192.57px]" data-name="CustomerHub">
      <Container80 />
      <Container81 />
    </div>
  );
}

function CustomerHub42() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers who primarily use basic services</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[20px] relative shrink-0 w-[35.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[35.523px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">1,234</p>
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Container83() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv5() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[339.712px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container83 />
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.49px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[77px]">17.9% of total</p>
    </div>
  );
}

function CustomerHub43() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container82 />
      <PrimitiveDiv5 />
      <Container84 />
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[42px]">$188K</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container85 />
      <Container86 />
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[32px]">$152</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container88 />
      <Container89 />
    </div>
  );
}

function CustomerHub44() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container87 />
      <Container90 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text28() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[42px]">+9.3%</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[61.922px]">
        <Icon31 />
        <Text28 />
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub45() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container91 />
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon32 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub46() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button11 />
      <Button12 />
    </div>
  );
}

function CardContent9() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub42 />
      <CustomerHub43 />
      <CustomerHub44 />
      <CustomerHub45 />
      <CustomerHub46 />
    </div>
  );
}

function Card10() {
  return (
    <div className="[grid-area:2_/_3] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub41 />
      <CardContent9 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_16055_2011)" id="Icon">
          <path d={svgPaths.p1902bdf0} id="Vector" stroke="var(--stroke-0, #7F22FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, #7F22FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, #7F22FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, #7F22FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, #7F22FE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2011">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-[rgba(142,81,255,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon33 />
      </div>
    </div>
  );
}

function CardTitle11() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[168.586px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Premium Service Users</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container93() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle11 />
        <Badge6 />
      </div>
    </div>
  );
}

function CustomerHub47() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[228.586px]" data-name="CustomerHub">
      <Container92 />
      <Container93 />
    </div>
  );
}

function CustomerHub48() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers who prefer high-end detailing services</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[23.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[23.367px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">412</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Container95() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv6() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[389.197px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container95 />
    </div>
  );
}

function Container96() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.45px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[73px]">6.0% of total</p>
    </div>
  );
}

function CustomerHub49() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container94 />
      <PrimitiveDiv6 />
      <Container96 />
    </div>
  );
}

function Container97() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[41px]">$157K</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container97 />
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[33px]">$381</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container100 />
      <Container101 />
    </div>
  );
}

function CustomerHub50() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container99 />
      <Container102 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text32() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[46px]">+11.2%</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.859px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[65.859px]">
        <Icon34 />
        <Text32 />
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub51() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container103 />
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon35 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub52() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button13 />
      <Button14 />
    </div>
  );
}

function CardContent10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub48 />
      <CustomerHub49 />
      <CustomerHub50 />
      <CustomerHub51 />
      <CustomerHub52 />
    </div>
  );
}

function Card11() {
  return (
    <div className="[grid-area:3_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub47 />
      <CardContent10 />
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container104() {
  return (
    <div className="bg-[rgba(254,154,0,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon36 />
      </div>
    </div>
  );
}

function CardTitle12() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[148.688px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Seasonal Customers</p>
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container105() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle12 />
        <Badge7 />
      </div>
    </div>
  );
}

function CustomerHub53() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[208.688px]" data-name="CustomerHub">
      <Container104 />
      <Container105 />
    </div>
  );
}

function CustomerHub54() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers who visit primarily during specific seasons</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[20px] relative shrink-0 w-[25.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[25.172px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">678</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text34 />
      <Text35 />
    </div>
  );
}

function Container107() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv7() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[373.184px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container107 />
    </div>
  );
}

function Container108() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.43px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[73px]">9.9% of total</p>
    </div>
  );
}

function CustomerHub55() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container106 />
      <PrimitiveDiv7 />
      <Container108 />
    </div>
  );
}

function Container109() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container110() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[36px]">$89K</p>
    </div>
  );
}

function Container111() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container109 />
      <Container110 />
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[32px]">$132</p>
    </div>
  );
}

function Container114() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container112 />
      <Container113 />
    </div>
  );
}

function CustomerHub56() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container111 />
      <Container114 />
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text36() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[42px]">+5.8%</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.82px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[61.82px]">
        <Icon37 />
        <Text36 />
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub57() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container115 />
          <Text37 />
        </div>
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon38 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub58() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button15 />
      <Button16 />
    </div>
  );
}

function CardContent11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub54 />
      <CustomerHub55 />
      <CustomerHub56 />
      <CustomerHub57 />
      <CustomerHub58 />
    </div>
  );
}

function Card12() {
  return (
    <div className="[grid-area:3_/_2] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub53 />
      <CardContent11 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_16055_2002)" id="Icon">
          <path d={svgPaths.p37143280} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1d7f0000} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2b722f80} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 5H11.6667" id="Vector_4" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 8.33333H11.6667" id="Vector_5" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 11.6667H11.6667" id="Vector_6" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 15H11.6667" id="Vector_7" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2002">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container116() {
  return (
    <div className="bg-[rgba(98,116,142,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon39 />
      </div>
    </div>
  );
}

function CardTitle13() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[113.617px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Corporate/Fleet</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[95.305px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[95.305px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">demographic</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container117() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle13 />
        <Badge8 />
      </div>
    </div>
  );
}

function CustomerHub59() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[173.617px]" data-name="CustomerHub">
      <Container116 />
      <Container117 />
    </div>
  );
}

function CustomerHub60() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">B2B customers with fleet washing contracts</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[20px] relative shrink-0 w-[17.555px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[17.555px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">89</p>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text38 />
      <Text39 />
    </div>
  );
}

function Container119() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv8() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[408.642px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container119 />
    </div>
  );
}

function Container120() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.33px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[71px]">1.3% of total</p>
    </div>
  );
}

function CustomerHub61() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container118 />
      <PrimitiveDiv8 />
      <Container120 />
    </div>
  );
}

function Container121() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[44px]">$234K</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container121 />
      <Container122 />
    </div>
  );
}

function Container124() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container125() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[43px]">$2629</p>
    </div>
  );
}

function Container126() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container124 />
      <Container125 />
    </div>
  );
}

function CustomerHub62() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container123 />
      <Container126 />
    </div>
  );
}

function Icon40() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text40() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[51px]">+28.5%</p>
      </div>
    </div>
  );
}

function Container127() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.156px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[70.156px]">
        <Icon40 />
        <Text40 />
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub63() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container127 />
          <Text41 />
        </div>
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon41 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub64() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button17 />
      <Button18 />
    </div>
  );
}

function CardContent12() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub60 />
      <CustomerHub61 />
      <CustomerHub62 />
      <CustomerHub63 />
      <CustomerHub64 />
    </div>
  );
}

function Card13() {
  return (
    <div className="[grid-area:3_/_3] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub59 />
      <CardContent12 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p28fda400} id="Vector_2" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #E60076)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container128() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Icon42 />
      </div>
    </div>
  );
}

function CardTitle14() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[142.531px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Referral Champions</p>
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute h-[22px] left-0 rounded-[8px] top-[28px] w-[78.531px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[78.531px]">
        <p className="absolute capitalize font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-neutral-950 text-nowrap top-[4px] whitespace-pre">behavioral</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container129() {
  return (
    <div className="basis-0 grow h-[50px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[50px] relative w-full">
        <CardTitle14 />
        <Badge9 />
      </div>
    </div>
  );
}

function CustomerHub65() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[50px] items-center left-[25px] top-[25px] w-[202.531px]" data-name="CustomerHub">
      <Container128 />
      <Container129 />
    </div>
  );
}

function CustomerHub66() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers who have referred 3+ new customers</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.055px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[70.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[20px] relative shrink-0 w-[23.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[23.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">156</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text42 />
      <Text43 />
    </div>
  );
}

function Container131() {
  return <div className="bg-[#030213] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv9() {
  return (
    <div className="bg-[rgba(3,2,19,0.2)] box-border content-stretch flex flex-col h-[8px] items-start overflow-clip pr-[404.609px] py-0 relative rounded-[1.67772e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container131 />
    </div>
  );
}

function Container132() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-[414.53px] not-italic text-[#717182] text-[12px] text-right top-px translate-x-[-100%] w-[73px]">2.3% of total</p>
    </div>
  );
}

function CustomerHub67() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[68px] items-start relative shrink-0 w-full" data-name="CustomerHub">
      <Container130 />
      <PrimitiveDiv9 />
      <Container132 />
    </div>
  );
}

function Container133() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Revenue</p>
    </div>
  );
}

function Container134() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[36px]">$68K</p>
    </div>
  );
}

function Container135() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container133 />
      <Container134 />
    </div>
  );
}

function Container136() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Avg LTV</p>
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 top-[0.5px] tracking-[-0.1504px] w-[35px]">$435</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container136 />
      <Container137 />
    </div>
  );
}

function CustomerHub68() {
  return (
    <div className="box-border gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Container135 />
      <Container138 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text44() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] top-[0.5px] tracking-[-0.1504px] w-[49px]">+19.4%</p>
      </div>
    </div>
  );
}

function Container139() {
  return (
    <div className="h-[20px] relative shrink-0 w-[68.492px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[68.492px]">
        <Icon43 />
        <Text44 />
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[16px] relative shrink-0 w-[66.617px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[66.617px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Growth rate</p>
      </div>
    </div>
  );
}

function CustomerHub69() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[10px] shrink-0 w-full" data-name="CustomerHub">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[8px] py-0 relative w-full">
          <Container139 />
          <Text45 />
        </div>
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="absolute left-[133.18px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16055_2042)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p245eb100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p18635ff0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2042">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[32px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-full">
        <Icon44 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[159.18px] not-italic text-[14px] text-nowrap text-white top-[6.5px] tracking-[-0.1504px] whitespace-pre">Target</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-[71.484px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[13px] py-px relative w-[71.484px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Details</p>
      </div>
    </div>
  );
}

function CustomerHub70() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[40px] items-start pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="CustomerHub">
      <Button19 />
      <Button20 />
    </div>
  );
}

function CardContent13() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[300px] items-start left-px px-[24px] py-0 top-[105px] w-[462px]" data-name="CardContent">
      <CustomerHub66 />
      <CustomerHub67 />
      <CustomerHub68 />
      <CustomerHub69 />
      <CustomerHub70 />
    </div>
  );
}

function Card14() {
  return (
    <div className="[grid-area:4_/_1] bg-white relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub65 />
      <CardContent13 />
    </div>
  );
}

function CustomerHub71() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] h-[1672px] relative shrink-0 w-full" data-name="CustomerHub">
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
      <Card14 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_16055_2079)" id="Icon">
          <path d={svgPaths.p1902bdf0} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_16055_2079">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[299.859px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[299.859px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">{`AI-Powered Insights & Recommendations`}</p>
      </div>
    </div>
  );
}

function CustomerHub72() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex gap-[8px] items-center relative shrink-0" data-name="CustomerHub">
      <Icon45 />
      <CardTitle15 />
    </div>
  );
}

function CardDescription() {
  return (
    <div className="[grid-area:2_/_1] relative shrink-0" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Actionable suggestions based on segment analysis</p>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="absolute box-border gap-[6px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[20px_minmax(0px,_1fr)] h-[74px] left-[2px] pb-0 pt-[24px] px-[24px] top-[2px] w-[1420px]" data-name="CardHeader">
      <CustomerHub72 />
      <CardDescription />
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.469px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[95.469px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">VIP Customers</p>
      </div>
    </div>
  );
}

function Badge10() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[103px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[103px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Retention Rate</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text46 />
      <Badge10 />
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[32px] relative shrink-0 w-[68.875px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[68.875px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[69px]">94.2%</p>
      </div>
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text47() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">up</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[36.414px]">
        <Icon46 />
        <Text47 />
      </div>
    </div>
  );
}

function Container143() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container141 />
      <Container142 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[350.031px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Create exclusive VIP perks program to maintain loyalty</p>
    </div>
  );
}

function Container144() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon47 />
      <Paragraph1 />
    </div>
  );
}

function Container145() {
  return (
    <div className="basis-0 grow h-[90px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[90px] items-start relative w-full">
        <Container140 />
        <Container143 />
        <Container144 />
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="bg-[#030213] h-[32px] relative rounded-[8px] shrink-0 w-[100.438px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[100.438px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Take Action</p>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="content-stretch flex h-[90px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container145 />
      <Button21 />
    </div>
  );
}

function Container147() {
  return (
    <div className="bg-white h-[124px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[124px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container146 />
        </div>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[20px] relative shrink-0 w-[120.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[120.766px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">At-Risk Customers</p>
      </div>
    </div>
  );
}

function Badge11() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[80.781px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[80.781px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Churn Risk</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text48 />
      <Badge11 />
    </div>
  );
}

function Container149() {
  return (
    <div className="h-[32px] relative shrink-0 w-[65.938px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[65.938px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[66px]">67.5%</p>
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2f7f3780} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa1bcac0} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text49() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#e7000b] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">down</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="h-[20px] relative shrink-0 w-[55.008px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[55.008px]">
        <Icon48 />
        <Text49 />
      </div>
    </div>
  );
}

function Container151() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container149 />
      <Container150 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[335.516px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Launch win-back campaign with 25% discount offer</p>
    </div>
  );
}

function Container152() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon49 />
      <Paragraph2 />
    </div>
  );
}

function Container153() {
  return (
    <div className="basis-0 grow h-[90px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[90px] items-start relative w-full">
        <Container148 />
        <Container151 />
        <Container152 />
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="bg-[#030213] h-[32px] relative rounded-[8px] shrink-0 w-[100.438px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[100.438px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Take Action</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="content-stretch flex h-[90px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container153 />
      <Button22 />
    </div>
  );
}

function Container155() {
  return (
    <div className="bg-white h-[124px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[124px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container154 />
        </div>
      </div>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[20px] relative shrink-0 w-[102.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[102.625px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">New Customers</p>
      </div>
    </div>
  );
}

function Badge12() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[148.688px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[148.688px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Conversion to Member</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text50 />
      <Badge12 />
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[32px] relative shrink-0 w-[63.664px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[63.664px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[64px]">32.1%</p>
      </div>
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text51() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">up</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[36.414px]">
        <Icon50 />
        <Text51 />
      </div>
    </div>
  );
}

function Container159() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container157 />
      <Container158 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[410.109px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Onboarding campaign to convert to membership within 60 days</p>
    </div>
  );
}

function Container160() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon51 />
      <Paragraph3 />
    </div>
  );
}

function Container161() {
  return (
    <div className="basis-0 grow h-[90px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[90px] items-start relative w-full">
        <Container156 />
        <Container159 />
        <Container160 />
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="bg-[#030213] h-[32px] relative rounded-[8px] shrink-0 w-[100.438px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[100.438px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Take Action</p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="content-stretch flex h-[90px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container161 />
      <Button23 />
    </div>
  );
}

function Container163() {
  return (
    <div className="bg-white h-[124px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[124px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container162 />
        </div>
      </div>
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[20px] relative shrink-0 w-[99.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[99.094px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Frequent Users</p>
      </div>
    </div>
  );
}

function Badge13() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[127.234px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[127.234px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Upsell Opportunity</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text52 />
      <Badge13 />
    </div>
  );
}

function Container165() {
  return (
    <div className="h-[32px] relative shrink-0 w-[67.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[67.227px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[68px]">78.3%</p>
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text53() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">stable</p>
      </div>
    </div>
  );
}

function Container166() {
  return (
    <div className="h-[20px] relative shrink-0 w-[59.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[59.313px]">
        <Icon52 />
        <Text53 />
      </div>
    </div>
  );
}

function Container167() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container165 />
      <Container166 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[344.938px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Introduce premium add-on services to frequent users</p>
    </div>
  );
}

function Container168() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon53 />
      <Paragraph4 />
    </div>
  );
}

function Container169() {
  return (
    <div className="basis-0 grow h-[90px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[90px] items-start relative w-full">
        <Container164 />
        <Container167 />
        <Container168 />
      </div>
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-[#030213] h-[32px] relative rounded-[8px] shrink-0 w-[100.438px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[100.438px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Take Action</p>
      </div>
    </div>
  );
}

function Container170() {
  return (
    <div className="content-stretch flex h-[90px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container169 />
      <Button24 />
    </div>
  );
}

function Container171() {
  return (
    <div className="bg-white h-[124px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[124px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container170 />
        </div>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[20px] relative shrink-0 w-[101.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[101.266px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Corporate/Fleet</p>
      </div>
    </div>
  );
}

function Badge14() {
  return (
    <div className="h-[22px] relative rounded-[8px] shrink-0 w-[112.641px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[22px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[112.641px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-950 text-nowrap whitespace-pre">Revenue Growth</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22px] items-center relative shrink-0 w-full" data-name="Container">
      <Text54 />
      <Badge14 />
    </div>
  );
}

function Container173() {
  return (
    <div className="h-[32px] relative shrink-0 w-[67.898px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[67.898px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-0 tracking-[0.0703px] w-[68px]">28.5%</p>
      </div>
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text55() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#00a63e] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">up</p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="h-[20px] relative shrink-0 w-[36.414px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20px] items-center relative w-[36.414px]">
        <Icon54 />
        <Text55 />
      </div>
    </div>
  );
}

function Container175() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <Container173 />
      <Container174 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[20px] left-[24px] top-0 w-[355.578px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Expand B2B sales team to capture more fleet contracts</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Icon55 />
      <Paragraph5 />
    </div>
  );
}

function Container177() {
  return (
    <div className="basis-0 grow h-[90px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[90px] items-start relative w-full">
        <Container172 />
        <Container175 />
        <Container176 />
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="bg-[#030213] h-[32px] relative rounded-[8px] shrink-0 w-[100.438px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[32px] items-center justify-center px-[12px] py-0 relative w-[100.438px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white tracking-[-0.1504px] whitespace-pre">Take Action</p>
      </div>
    </div>
  );
}

function Container178() {
  return (
    <div className="content-stretch flex h-[90px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container177 />
      <Button25 />
    </div>
  );
}

function Container179() {
  return (
    <div className="bg-white h-[124px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[124px] items-start pb-px pt-[17px] px-[17px] relative w-full">
          <Container178 />
        </div>
      </div>
    </div>
  );
}

function CustomerHub73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[668px] items-start left-[26px] top-[100px] w-[1372px]" data-name="CustomerHub">
      <Container147 />
      <Container155 />
      <Container163 />
      <Container171 />
      <Container179 />
    </div>
  );
}

function Card15() {
  return (
    <div className="bg-[rgba(239,246,255,0.5)] h-[794px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader4 />
      <CustomerHub73 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1424px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-full items-start relative w-[1424px]">
        <CustomerHub8 />
        <Card4 />
        <CustomerHub71 />
        <Card15 />
      </div>
    </div>
  );
}

function PrimitiveDiv10() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[3006px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function CustomerHub74() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[3084px] items-start left-[24px] top-[89px] w-[1424px]" data-name="CustomerHub">
      <Container1 />
      <PrimitiveDiv10 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6 2V14" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[24px] rounded-[8px] size-[28px] top-[18px]" data-name="Button">
      <Icon56 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[32px] left-[68px] top-[16px] w-[1380px]" data-name="Heading 1">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">Customer Hub</p>
    </div>
  );
}

function SidebarTrigger() {
  return (
    <div className="absolute left-[37.5px] overflow-clip size-px top-[31.5px]" data-name="SidebarTrigger">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Toggle Sidebar</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white h-[65px] left-0 top-0 w-[1472px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Button26 />
      <Heading1 />
      <SidebarTrigger />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow h-[3262px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[3262px] overflow-clip relative rounded-[inherit] w-full">
        <CustomerHub74 />
        <Header />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute content-stretch flex h-[3199px] items-start left-0 overflow-clip top-0 w-[1728px]" data-name="App">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1d3f6c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p37cfb400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container180() {
  return (
    <div className="bg-[#030213] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon57 />
      </div>
    </div>
  );
}

function Container181() {
  return (
    <div className="h-[28px] relative shrink-0 w-[113.055px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[113.055px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[18px] text-neutral-950 text-nowrap top-0 tracking-[-0.4395px] whitespace-pre">LetWash CRM</p>
      </div>
    </div>
  );
}

function App1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[223px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-full items-center relative w-[223px]">
        <Container180 />
        <Container181 />
      </div>
    </div>
  );
}

function SidebarHeader() {
  return (
    <div className="h-[73px] relative shrink-0 w-[255px]" data-name="SidebarHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[73px] items-start pb-[17px] pl-[16px] pr-0 pt-[16px] relative w-[255px]">
        <App1 />
      </div>
    </div>
  );
}

function SidebarGroupLabel() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[239px]" data-name="SidebarGroupLabel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative w-[239px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Main Menu</p>
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d76d410} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f091200} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p39897300} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.203px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[60.203px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Overview</p>
      </div>
    </div>
  );
}

function SidebarMenuButton() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon58 />
      <App2 />
    </div>
  );
}

function SidebarMenuItem() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton />
    </div>
  );
}

function Icon59() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p32887f80} id="Vector" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3baa1080} id="Vector_2" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p188b8380} id="Vector_3" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3694d280} id="Vector_4" stroke="var(--stroke-0, #171717)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.563px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[95.563px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-neutral-900 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Customer Hub</p>
      </div>
    </div>
  );
}

function SidebarMenuButton1() {
  return (
    <div className="absolute bg-neutral-100 box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon59 />
      <App3 />
    </div>
  );
}

function SidebarMenuItem1() {
  return (
    <div className="absolute h-[32px] left-0 top-[36px] w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton1 />
    </div>
  );
}

function Icon60() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[58.828px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[58.828px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Analytics</p>
      </div>
    </div>
  );
}

function SidebarMenuButton2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon60 />
      <App4 />
    </div>
  );
}

function SidebarMenuItem2() {
  return (
    <div className="absolute h-[32px] left-0 top-[72px] w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton2 />
    </div>
  );
}

function Icon61() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3783f000} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p25567f00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.336px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[72.336px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Campaigns</p>
      </div>
    </div>
  );
}

function SidebarMenuButton3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon61 />
      <App5 />
    </div>
  );
}

function SidebarMenuItem3() {
  return (
    <div className="absolute h-[32px] left-0 top-[108px] w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton3 />
    </div>
  );
}

function Icon62() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2bb95e00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 14.6667V8" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14df0fc0} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5 2.84666L11 6.27999" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[134.664px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[134.664px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">{`Services & Packages`}</p>
      </div>
    </div>
  );
}

function SidebarMenuButton4() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon62 />
      <App6 />
    </div>
  );
}

function SidebarMenuItem4() {
  return (
    <div className="absolute h-[32px] left-0 top-[144px] w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton4 />
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 1.33333V14.6667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5120400} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function App7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[135.953px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] overflow-clip relative rounded-[inherit] w-[135.953px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">{`Revenue & Feedback`}</p>
      </div>
    </div>
  );
}

function SidebarMenuButton5() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[32px] items-center left-0 overflow-clip pl-[8px] pr-0 py-0 rounded-[8px] top-0 w-[239px]" data-name="SidebarMenuButton">
      <Icon63 />
      <App7 />
    </div>
  );
}

function SidebarMenuItem5() {
  return (
    <div className="absolute h-[32px] left-0 top-[180px] w-[239px]" data-name="SidebarMenuItem">
      <SidebarMenuButton5 />
    </div>
  );
}

function SidebarMenu() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[239px]" data-name="SidebarMenu">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[239px]">
        <SidebarMenuItem />
        <SidebarMenuItem1 />
        <SidebarMenuItem2 />
        <SidebarMenuItem3 />
        <SidebarMenuItem4 />
        <SidebarMenuItem5 />
      </div>
    </div>
  );
}

function SidebarGroup() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[260px] items-start left-0 pl-[8px] pr-0 py-[8px] top-0 w-[255px]" data-name="SidebarGroup">
      <SidebarGroupLabel />
      <SidebarMenu />
    </div>
  );
}

function SidebarGroupLabel1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[239px]" data-name="SidebarGroupLabel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center px-[8px] py-0 relative w-[239px]">
        <p className="font-['Inter:Medium',_sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-[rgba(10,10,10,0.7)] text-nowrap whitespace-pre">Quick Stats</p>
      </div>
    </div>
  );
}

function Container182() {
  return (
    <div className="h-[16px] relative shrink-0 w-[94.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[94.086px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Total Companies</p>
      </div>
    </div>
  );
}

function Icon64() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_16052_24669)" id="Icon">
          <path d={svgPaths.p3eccb680} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p34cd6600} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p36b1f500} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 3H7" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 5H7" id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 7H7" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 9H7" id="Vector_7" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24669">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container183() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container182 />
      <Icon64 />
    </div>
  );
}

function Container184() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">5</p>
    </div>
  );
}

function Container185() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container183 />
          <Container184 />
        </div>
      </div>
    </div>
  );
}

function Container186() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[92.125px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Total Customers</p>
      </div>
    </div>
  );
}

function Icon65() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p296249c0} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p71c6d40} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container187() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container186 />
      <Icon65 />
    </div>
  );
}

function Container188() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">5,250</p>
    </div>
  );
}

function Container189() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container187 />
          <Container188 />
        </div>
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="h-[16px] relative shrink-0 w-[99.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[99.703px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Platform Revenue</p>
      </div>
    </div>
  );
}

function Icon66() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M6 1V11" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pd270} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container191() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container190 />
      <Icon66 />
    </div>
  );
}

function Container192() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">$824K</p>
    </div>
  );
}

function Container193() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container191 />
          <Container192 />
        </div>
      </div>
    </div>
  );
}

function App8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[239px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start px-[8px] py-0 relative w-[239px]">
        <Container185 />
        <Container189 />
        <Container193 />
      </div>
    </div>
  );
}

function SidebarGroup1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[288px] items-start left-0 pl-[8px] pr-0 py-[8px] top-[268px] w-[255px]" data-name="SidebarGroup">
      <SidebarGroupLabel1 />
      <App8 />
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255px]" data-name="SidebarContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[255px]">
        <SidebarGroup />
        <SidebarGroup1 />
      </div>
    </div>
  );
}

function Container194() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Admin User</p>
    </div>
  );
}

function Container195() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute capitalize font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">root owner</p>
    </div>
  );
}

function Container196() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[60px] top-[10px] w-[127px]" data-name="Container">
      <Container194 />
      <Container195 />
    </div>
  );
}

function Icon67() {
  return (
    <div className="absolute left-[199px] size-[16px] top-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text56() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center justify-center relative w-full">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px] whitespace-pre">AU</p>
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="absolute content-stretch flex items-start left-[8px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[8px]" data-name="Primitive.span">
      <Text56 />
    </div>
  );
}

function App9() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="App">
      <Container196 />
      <Icon67 />
      <PrimitiveSpan />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[223px]" data-name="Primitive.button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start relative w-[223px]">
        <App9 />
      </div>
    </div>
  );
}

function SidebarFooter() {
  return (
    <div className="h-[89px] relative shrink-0 w-[255px]" data-name="SidebarFooter">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[89px] items-start pb-[16px] pl-[16px] pr-0 pt-[17px] relative w-[255px]">
        <PrimitiveButton2 />
      </div>
    </div>
  );
}

function Container197() {
  return (
    <div className="basis-0 bg-neutral-50 grow h-[993px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[993px] items-start relative w-full">
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter />
      </div>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="absolute box-border content-stretch flex h-[993px] items-start left-0 pl-0 pr-px py-0 top-0 w-[256px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <Container197 />
    </div>
  );
}

export default function CustomerManagementCrmPlatform() {
  return (
    <div className="bg-white relative size-full" data-name="Customer Management CRM Platform">
      <App />
      <Sidebar1 />
    </div>
  );
}