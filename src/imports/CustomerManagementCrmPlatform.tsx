import svgPaths from "./svg-1k6vfz20ll";

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
    <div className="[grid-area:1_/_1] bg-white h-[29px] relative rounded-[14px] shrink-0" data-name="Primitive.button">
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
    <div className="[grid-area:1_/_2] h-[29px] relative rounded-[14px] shrink-0" data-name="Primitive.button">
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
    <div className="h-[16px] relative shrink-0 w-[44.117px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[44.117px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Filters</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[32px] relative rounded-[8px] shrink-0 w-[105.164px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[105.164px]">
        <Icon3 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[14px] text-neutral-950 text-nowrap top-[6.5px] tracking-[-0.1504px] whitespace-pre">Clear All</p>
      </div>
    </div>
  );
}

function CustomerHub() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center justify-between left-[25px] top-[25px] w-[1374px]" data-name="CustomerHub">
      <CardTitle />
      <Button1 />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[36px] left-0 rounded-[8px] top-0 w-[1374px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] w-[1374px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Search customers...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub1() {
  return (
    <div className="absolute h-[36px] left-[25px] top-[87px] w-[1374px]" data-name="CustomerHub">
      <Input />
      <Icon4 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[148px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CustomerHub />
      <CustomerHub1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[9px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24587)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24587">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="basis-0 bg-white grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[29px] relative w-full">
        <Icon5 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[39px] not-italic text-[14px] text-neutral-950 text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">B2B - Carwash Companies</p>
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[9px] size-[16px] top-[6.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="basis-0 grow h-[29px] min-h-px min-w-px relative rounded-[14px] shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[29px] relative w-full">
        <Icon6 />
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[39px] not-italic text-[14px] text-neutral-950 text-nowrap top-[5px] tracking-[-0.1504px] whitespace-pre">B2C - Car Owners</p>
      </div>
    </div>
  );
}

function TabList1() {
  return (
    <div className="bg-[#ececf0] h-[36px] relative rounded-[14px] shrink-0 w-[396.93px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-[396.93px]">
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-0 not-italic text-[16px] text-neutral-950 text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Carwash Companies</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[24px] left-0 not-italic text-[#717182] text-[16px] text-nowrap top-[-0.5px] tracking-[-0.3125px] whitespace-pre">Business accounts registered on the platform</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[328.227px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[328.227px]">
        <CardTitle1 />
        <CardDescription />
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.266px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[61.266px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">All Status</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="absolute bg-[#f3f3f5] box-border content-stretch flex h-[36px] items-center justify-between left-0 px-[13px] py-px rounded-[8px] top-0 w-[140px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <PrimitiveSpan />
      <Icon7 />
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82.25px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[82.25px]">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">All Locations</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="absolute bg-[#f3f3f5] box-border content-stretch flex h-[36px] items-center justify-between left-[148px] px-[13px] py-px rounded-[8px] top-0 w-[180px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <PrimitiveSpan1 />
      <Icon8 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[36px] relative shrink-0 w-[328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[328px]">
        <PrimitiveButton4 />
        <PrimitiveButton5 />
      </div>
    </div>
  );
}

function CustomerHub2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[1374px]" data-name="CustomerHub">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center justify-between relative w-[1374px]">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function TableHead() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[321.328px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Company Name</p>
    </div>
  );
}

function TableHead1() {
  return (
    <div className="absolute h-[40px] left-[321.33px] top-0 w-[234.18px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Location</p>
    </div>
  );
}

function TableHead2() {
  return (
    <div className="absolute h-[40px] left-[555.51px] top-0 w-[133.258px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Branches</p>
    </div>
  );
}

function TableHead3() {
  return (
    <div className="absolute h-[40px] left-[688.77px] top-0 w-[149.961px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Customers</p>
    </div>
  );
}

function TableHead4() {
  return (
    <div className="absolute h-[40px] left-[838.73px] top-0 w-[201.914px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Revenue (MTD)</p>
    </div>
  );
}

function TableHead5() {
  return (
    <div className="absolute h-[40px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Status</p>
    </div>
  );
}

function TableHead6() {
  return (
    <div className="absolute h-[40px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableHead">
      <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[10.25px] tracking-[-0.1504px] whitespace-pre">Joined</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1374px]" data-name="TableRow">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <TableHead />
      <TableHead1 />
      <TableHead2 />
      <TableHead3 />
      <TableHead4 />
      <TableHead5 />
      <TableHead6 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1374px]" data-name="TableHeader">
      <TableRow />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24660)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24660">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon9 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Sparkle Wash Co.</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">+1 (555) 123-4567</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[40px] relative shrink-0 w-[122.164px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[122.164px]">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function CustomerHub3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[8px] top-[8.5px] w-[305.328px]" data-name="CustomerHub">
      <Container4 />
      <Container7 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[321.328px]" data-name="TableCell">
      <CustomerHub3 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub4() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[18.5px] w-[218.18px]" data-name="CustomerHub">
      <Icon10 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">New York, NY</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[57px] left-[321.33px] top-0 w-[234.18px]" data-name="TableCell">
      <CustomerHub4 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[57px] left-[555.51px] top-0 w-[133.258px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">8</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[57px] left-[688.77px] top-0 w-[149.961px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">1,240</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[57px] left-[838.73px] top-0 w-[201.914px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#00a63e] text-[14px] top-[19px] tracking-[-0.1504px] w-[64px]">$245,000</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#030213] h-[22px] left-[8px] rounded-[8px] top-[17.5px] w-[52.781px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[52.781px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[57px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableCell">
      <Badge />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[57px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#717182] text-[14px] text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2024-01-15</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[1374px]" data-name="TableRow">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24660)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24660">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Premier Auto Care</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">+1 (555) 234-5678</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[40px] relative shrink-0 w-[124.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[124.406px]">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function CustomerHub5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[8px] top-[8.5px] w-[305.328px]" data-name="CustomerHub">
      <Container8 />
      <Container11 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[321.328px]" data-name="TableCell">
      <CustomerHub5 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub6() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[18.5px] w-[218.18px]" data-name="CustomerHub">
      <Icon12 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Los Angeles, CA</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[57px] left-[321.33px] top-0 w-[234.18px]" data-name="TableCell">
      <CustomerHub6 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[57px] left-[555.51px] top-0 w-[133.258px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">12</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[57px] left-[688.77px] top-0 w-[149.961px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2,100</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[57px] left-[838.73px] top-0 w-[201.914px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#00a63e] text-[14px] top-[19px] tracking-[-0.1504px] w-[64px]">$389,000</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#030213] h-[22px] left-[8px] rounded-[8px] top-[17.5px] w-[52.781px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[52.781px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[57px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableCell">
      <Badge1 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[57px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#717182] text-[14px] text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2024-02-10</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[57px] left-0 top-[57px] w-[1374px]" data-name="TableRow">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24660)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24660">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Quick Clean Express</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">+1 (555) 345-6789</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[40px] relative shrink-0 w-[132.211px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[132.211px]">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function CustomerHub7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[8px] top-[8.5px] w-[305.328px]" data-name="CustomerHub">
      <Container12 />
      <Container15 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[321.328px]" data-name="TableCell">
      <CustomerHub7 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub8() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[18.5px] w-[218.18px]" data-name="CustomerHub">
      <Icon14 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Chicago, IL</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[57px] left-[321.33px] top-0 w-[234.18px]" data-name="TableCell">
      <CustomerHub8 />
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[57px] left-[555.51px] top-0 w-[133.258px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">5</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[57px] left-[688.77px] top-0 w-[149.961px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">680</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[57px] left-[838.73px] top-0 w-[201.914px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#00a63e] text-[14px] top-[19px] tracking-[-0.1504px] w-[59px]">$112,000</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#030213] h-[22px] left-[8px] rounded-[8px] top-[17.5px] w-[52.781px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[52.781px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[57px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableCell">
      <Badge2 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[57px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#717182] text-[14px] text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2024-03-20</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[57px] left-0 top-[114px] w-[1374px]" data-name="TableRow">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24660)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24660">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Elite Detailing</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">+1 (555) 456-7890</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[40px] relative shrink-0 w-[124.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[124.906px]">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function CustomerHub9() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[8px] top-[8.5px] w-[305.328px]" data-name="CustomerHub">
      <Container16 />
      <Container19 />
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[57px] left-0 top-0 w-[321.328px]" data-name="TableCell">
      <CustomerHub9 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub10() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[18.5px] w-[218.18px]" data-name="CustomerHub">
      <Icon16 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Houston, TX</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[57px] left-[321.33px] top-0 w-[234.18px]" data-name="TableCell">
      <CustomerHub10 />
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[57px] left-[555.51px] top-0 w-[133.258px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">3</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[57px] left-[688.77px] top-0 w-[149.961px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">340</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[57px] left-[838.73px] top-0 w-[201.914px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#00a63e] text-[14px] top-[19px] tracking-[-0.1504px] w-[55px]">$78,000</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#030213] h-[22px] left-[8px] rounded-[8px] top-[17.5px] w-[52.781px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[52.781px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[57px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableCell">
      <Badge3 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[57px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#717182] text-[14px] text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2024-04-05</p>
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[57px] left-0 top-[171px] w-[1374px]" data-name="TableRow">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none" />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24660)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #030213)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24660">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(3,2,19,0.1)] relative rounded-[1.67772e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon17 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">EcoWash Solutions</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">+1 (555) 567-8901</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[40px] relative shrink-0 w-[122.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-[122.602px]">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function CustomerHub11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[8px] top-[8.5px] w-[305.328px]" data-name="CustomerHub">
      <Container20 />
      <Container23 />
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[56.5px] left-0 top-0 w-[321.328px]" data-name="TableCell">
      <CustomerHub11 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-0 size-[12px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p2023d200} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2d617c80} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function CustomerHub12() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[18.5px] w-[218.18px]" data-name="CustomerHub">
      <Icon18 />
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Phoenix, AZ</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[56.5px] left-[321.33px] top-0 w-[234.18px]" data-name="TableCell">
      <CustomerHub12 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[56.5px] left-[555.51px] top-0 w-[133.258px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">6</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[56.5px] left-[688.77px] top-0 w-[149.961px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[14px] text-neutral-950 text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">890</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[56.5px] left-[838.73px] top-0 w-[201.914px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#00a63e] text-[14px] top-[19px] tracking-[-0.1504px] w-[62px]">$156,000</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#d4183d] h-[22px] left-[8px] rounded-[8px] top-[17.5px] w-[81.711px]" data-name="Badge">
      <div className="h-[22px] overflow-clip relative rounded-[inherit] w-[81.711px]">
        <p className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[16px] left-[9px] not-italic text-[12px] text-nowrap text-white top-[4px] whitespace-pre">suspended</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[56.5px] left-[1040.64px] top-0 w-[166.82px]" data-name="TableCell">
      <Badge4 />
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[56.5px] left-[1207.46px] top-0 w-[166.539px]" data-name="TableCell">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-[8px] not-italic text-[#717182] text-[14px] text-nowrap top-[19px] tracking-[-0.1504px] whitespace-pre">2024-02-28</p>
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[56.5px] left-0 top-[228px] w-[1374px]" data-name="TableRow">
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[284.5px] left-0 top-[40px] w-[1374px]" data-name="TableBody">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
    </div>
  );
}

function Table() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1374px]" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[1374px]">
        <TableHeader />
        <TableBody />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white h-[444.5px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] h-[444.5px] items-start pl-[25px] pr-px py-[25px] relative w-full">
          <CustomerHub2 />
          <Table />
        </div>
      </div>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[107.516px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[107.516px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Companies</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_16052_24578)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_16052_24578">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[52px] relative shrink-0 w-[462px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[462px]">
        <CardTitle2 />
        <Icon19 />
      </div>
    </div>
  );
}

function CustomerHub13() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">5</p>
    </div>
  );
}

function CustomerHub14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] top-px w-[46px]">4 active</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[462px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start px-[24px] py-0 relative w-[462px]">
        <CustomerHub13 />
        <CustomerHub14 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader />
      <CardContent />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.789px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[95.789px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Total Branches</p>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="h-[52px] relative shrink-0 w-[462px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[462px]">
        <CardTitle3 />
        <Icon20 />
      </div>
    </div>
  );
}

function CustomerHub15() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 text-nowrap top-0 tracking-[0.0703px] whitespace-pre">5</p>
    </div>
  );
}

function CustomerHub16() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Across all companies</p>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[462px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start px-[24px] py-0 relative w-[462px]">
        <CustomerHub15 />
        <CustomerHub16 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_2] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader1 />
      <CardContent1 />
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[113.914px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[113.914px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Platform Revenue</p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3155f180} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pea6a680} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="h-[52px] relative shrink-0 w-[462px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[52px] items-center justify-between px-[24px] py-0 relative w-[462px]">
        <CardTitle4 />
        <Icon21 />
      </div>
    </div>
  );
}

function CustomerHub17() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[32px] left-0 not-italic text-[24px] text-neutral-950 top-[0.5px] tracking-[0.0703px] w-[155px]">$980,000</p>
    </div>
  );
}

function CustomerHub18() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CustomerHub">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] text-nowrap top-px whitespace-pre">+12.5% from last month</p>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[462px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-full items-start px-[24px] py-0 relative w-[462px]">
        <CustomerHub17 />
        <CustomerHub18 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:1_/_3] bg-white box-border content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <CardHeader2 />
      <CardContent2 />
    </div>
  );
}

function CustomerHub19() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[150px] relative shrink-0 w-full" data-name="CustomerHub">
      <Card2 />
      <Card3 />
      <Card4 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1424px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[16px] h-full items-start relative w-[1424px]">
        <Card1 />
        <CustomerHub19 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[686.5px] items-start pb-[16px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <TabList1 />
      <TabPanel />
    </div>
  );
}

function TabPanel1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1424px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-full items-start relative w-[1424px]">
        <Card />
        <Container24 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[32px] h-[950.5px] items-start pb-[24px] pt-0 px-0 relative shrink-0 w-full" data-name="Primitive.div">
      <TabList />
      <TabPanel1 />
    </div>
  );
}

function CustomerHub20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[1028.5px] items-start left-[24px] top-[89px] w-[1424px]" data-name="CustomerHub">
      <Container1 />
      <PrimitiveDiv />
    </div>
  );
}

function Icon22() {
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

function Button2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[24px] rounded-[8px] size-[28px] top-[18px]" data-name="Button">
      <Icon22 />
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
      <Button2 />
      <Heading1 />
      <SidebarTrigger />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 grow h-[1150px] min-h-px min-w-px relative shrink-0" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[1150px] overflow-clip relative rounded-[inherit] w-full">
        <CustomerHub20 />
        <Header />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="absolute content-stretch flex h-[1150px] items-start left-0 overflow-clip top-0 w-[1728px]" data-name="App">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Icon23() {
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

function Container25() {
  return (
    <div className="bg-[#030213] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon23 />
      </div>
    </div>
  );
}

function Container26() {
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
        <Container25 />
        <Container26 />
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

function Icon24() {
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
      <Icon24 />
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

function Icon25() {
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
      <Icon25 />
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

function Icon26() {
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
      <Icon26 />
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

function Icon27() {
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
      <Icon27 />
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

function Icon28() {
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
      <Icon28 />
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

function Icon29() {
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
      <Icon29 />
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

function Container27() {
  return (
    <div className="h-[16px] relative shrink-0 w-[94.086px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[94.086px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Total Companies</p>
      </div>
    </div>
  );
}

function Icon30() {
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

function Container28() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Icon30 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">5</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container28 />
          <Container29 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92.125px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[92.125px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Total Customers</p>
      </div>
    </div>
  );
}

function Icon31() {
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

function Container32() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Icon31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">5,250</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container32 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16px] relative shrink-0 w-[99.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16px] relative w-[99.703px]">
        <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">Platform Revenue</p>
      </div>
    </div>
  );
}

function Icon32() {
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

function Container36() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Icon32 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[28px] left-0 not-italic text-[20px] text-neutral-950 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">$824K</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-neutral-100 h-[72px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[4px] h-[72px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Container36 />
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function App8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[239px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-full items-start px-[8px] py-0 relative w-[239px]">
        <Container30 />
        <Container34 />
        <Container38 />
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

function Container39() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-[0.5px] tracking-[-0.1504px] whitespace-pre">Admin User</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute capitalize font-['Inter:Regular',_sans-serif] font-normal leading-[16px] left-0 not-italic text-[#717182] text-[12px] text-nowrap top-px whitespace-pre">root owner</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[60px] top-[10px] w-[127px]" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Icon33() {
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

function Text() {
  return (
    <div className="basis-0 bg-[#030213] grow h-[40px] min-h-px min-w-px relative rounded-[1.67772e+07px] shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center justify-center relative w-full">
        <p className="font-['Inter:Regular',_sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white tracking-[-0.3125px] whitespace-pre">AU</p>
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="absolute content-stretch flex items-start left-[8px] overflow-clip rounded-[1.67772e+07px] size-[40px] top-[8px]" data-name="Primitive.span">
      <Text />
    </div>
  );
}

function App9() {
  return (
    <div className="h-[56px] relative rounded-[10px] shrink-0 w-full" data-name="App">
      <Container41 />
      <Icon33 />
      <PrimitiveSpan2 />
    </div>
  );
}

function PrimitiveButton6() {
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
        <PrimitiveButton6 />
      </div>
    </div>
  );
}

function Container42() {
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
      <Container42 />
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