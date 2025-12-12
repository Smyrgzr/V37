import svgPaths from "./svg-mfuz55ft80";

function CardTitle() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">{`Weekday Operating Hours & Capacity planning`}</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#717182] text-[14px] text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Set the operating schedule for this branch</p>
    </div>
  );
}

function BranchForm() {
  return (
    <div className="h-[35px] relative shrink-0 w-[330.688px]" data-name="BranchForm">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-[35px] items-start relative w-[330.688px]">
        <CardTitle />
        <CardDescription />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[8.75px] size-[14px] top-[7px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p26576520} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1177c520} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[28px] relative rounded-[6.75px] shrink-0 w-[66.609px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[6.75px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[28px] relative w-[66.609px]">
        <Icon />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.5px] left-[35px] not-italic text-[12.25px] text-black text-nowrap top-[5.25px] tracking-[-0.0179px] whitespace-pre">Edit</p>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[70px] relative shrink-0 w-[1120px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[686px] h-[70px] items-center px-[21px] py-0 relative w-[1120px]">
        <BranchForm />
        <Button />
      </div>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Monday</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.91%] left-[58.33%] right-1/4 top-[33.34%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.18%_41.67%_54.15%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.68%] left-1/4 right-[58.33%] top-[12.49%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.82%_8.33%_8.34%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Frame238() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame235() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[123.685px]">
      <Frame238 />
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan1 />
    </div>
  );
}

function Frame246() {
  return (
    <div className="content-stretch flex gap-[36.622px] items-center justify-center relative shrink-0">
      <Frame235 />
      <PrimitiveButton1 />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame84 />
        <Frame />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame85 />
        <Frame1 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame86 />
        <Frame2 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel2 />
      <Input2 />
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame96 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame90 />
    </div>
  );
}

function Frame244() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame246 />
      <Frame88 />
    </div>
  );
}

function Frame259() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame244 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.49%_20.83%_8.34%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Frame239() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame240() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container4 />
      <Frame239 />
    </div>
  );
}

function Frame241() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame240 />
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan2 />
    </div>
  );
}

function Frame257() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame241 />
      <PrimitiveButton2 />
    </div>
  );
}

function Frame236() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame257 />
    </div>
  );
}

function Frame258() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame236 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame87 />
        <Frame3 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel3 />
      <Input3 />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame91 />
        <Frame4 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel4 />
      <Input4 />
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame92 />
        <Frame5 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel5 />
      <Input5 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame97 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame93 />
    </div>
  );
}

function Frame245() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame258 />
      <Frame98 />
    </div>
  );
}

function Frame264() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame245 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[8.33%] right-[41.67%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[58.33%] right-[8.33%] top-[33.34%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_20.83%_16.66%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_62.5%_16.66%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Frame237() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container8 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan3 />
    </div>
  );
}

function Frame261() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame237 />
      <PrimitiveButton3 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame99() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame99 />
        <Frame6 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel6 />
      <Input6 />
    </div>
  );
}

function PrimitiveLabel7() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame100() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame100 />
        <Frame7 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel7 />
      <Input7 />
    </div>
  );
}

function PrimitiveLabel8() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame101() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame101 />
        <Frame8 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel8 />
      <Input8 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame102 />
    </div>
  );
}

function Frame104() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame103 />
    </div>
  );
}

function Frame262() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame261 />
      <Frame104 />
    </div>
  );
}

function Frame263() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame262 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.18%_8.33%_29.15%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.49%_62.5%_20.85%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.82%_37.5%_29.18%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.49%_20.84%_20.85%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Frame234() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container12 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan4() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan4 />
    </div>
  );
}

function Frame266() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame234 />
      <PrimitiveButton4 />
      <Frame234 />
    </div>
  );
}

function PrimitiveLabel9() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame105() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame105 />
        <Frame9 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel9 />
      <Input9 />
    </div>
  );
}

function PrimitiveLabel10() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame106() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame106 />
        <Frame10 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel10 />
      <Input10 />
    </div>
  );
}

function PrimitiveLabel11() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame107() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame107 />
        <Frame11 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel11 />
      <Input11 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame108 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame109 />
    </div>
  );
}

function Frame267() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame266 />
      <Frame110 />
    </div>
  );
}

function Frame265() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame267 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.34%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.16%_37.5%_45.84%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Frame242() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame243() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container16 />
      <Frame242 />
    </div>
  );
}

function Frame268() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame243 />
    </div>
  );
}

function PrimitiveSpan5() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan5 />
    </div>
  );
}

function Frame269() {
  return (
    <div className="content-stretch flex gap-[77.604px] h-[28.806px] items-center relative shrink-0 w-[191.624px]">
      <Frame268 />
      <PrimitiveButton5 />
    </div>
  );
}

function PrimitiveLabel12() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame111 />
        <Frame12 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel12 />
      <Input12 />
    </div>
  );
}

function PrimitiveLabel13() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input13() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame112 />
        <Frame13 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel13 />
      <Input13 />
    </div>
  );
}

function PrimitiveLabel14() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input14() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame113 />
        <Frame14 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel14 />
      <Input14 />
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container17 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Frame115() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame114 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[202.947px]">
      <Frame115 />
    </div>
  );
}

function Frame247() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame269 />
      <Frame116 />
    </div>
  );
}

function Frame260() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame247 />
    </div>
  );
}

function Frame248() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame259 />
      <Frame264 />
      <Frame263 />
      <Frame265 />
      <Frame260 />
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame248 />
    </div>
  );
}

function Frame249() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame94 />
      <Frame89 />
    </div>
  );
}

function PrimitiveSpan6() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton6() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan6 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton6 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Tuesday</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.92%] left-[58.33%] right-1/4 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_41.67%_54.16%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.69%] left-1/4 right-[58.33%] top-[12.48%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.81%_8.33%_8.35%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Frame270() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container20 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame271() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[123.685px]">
      <Frame270 />
    </div>
  );
}

function PrimitiveSpan7() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton7() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan7 />
    </div>
  );
}

function Frame272() {
  return (
    <div className="content-stretch flex gap-[36.622px] items-center justify-center relative shrink-0">
      <Frame271 />
      <PrimitiveButton7 />
    </div>
  );
}

function PrimitiveLabel15() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2581">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2581)" />
          <path d={svgPaths.p1a6e1de0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input15() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame117 />
        <Frame15 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel15 />
      <Input15 />
    </div>
  );
}

function PrimitiveLabel16() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2537">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2537)" />
          <path d={svgPaths.pb00e80} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input16() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame118 />
        <Frame16 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel16 />
      <Input16 />
    </div>
  );
}

function PrimitiveLabel17() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2557">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2557)" />
          <path d={svgPaths.p154e5880} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input17() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame119 />
        <Frame17 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel17 />
      <Input17 />
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container21 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame120 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame121 />
    </div>
  );
}

function Frame273() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame272 />
      <Frame122 />
    </div>
  );
}

function Frame274() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame273 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.48%_20.83%_8.35%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Frame275() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame276() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container24 />
      <Frame275 />
    </div>
  );
}

function Frame277() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame276 />
    </div>
  );
}

function PrimitiveSpan8() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton8() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan8 />
    </div>
  );
}

function Frame278() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame277 />
      <PrimitiveButton8 />
    </div>
  );
}

function Frame279() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame278 />
    </div>
  );
}

function Frame280() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame279 />
    </div>
  );
}

function PrimitiveLabel18() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input18() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame123 />
        <Frame18 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel18 />
      <Input18 />
    </div>
  );
}

function PrimitiveLabel19() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input19() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame124 />
        <Frame19 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel19 />
      <Input19 />
    </div>
  );
}

function PrimitiveLabel20() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input20() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame125 />
        <Frame20 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel20 />
      <Input20 />
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container25 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame126 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame127 />
    </div>
  );
}

function Frame281() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame280 />
      <Frame128 />
    </div>
  );
}

function Frame282() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame281 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.66%_41.67%_25.01%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[74.99%_37.5%_25.01%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.33%_8.33%_25.01%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.66%_20.83%_16.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.66%_62.5%_16.67%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Frame283() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container28 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan9() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton9() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan9 />
    </div>
  );
}

function Frame284() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame283 />
      <PrimitiveButton9 />
    </div>
  );
}

function PrimitiveLabel21() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2549">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2549)" />
          <path d={svgPaths.pff11d00} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input21() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame129 />
        <Frame21 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel21 />
      <Input21 />
    </div>
  );
}

function PrimitiveLabel22() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2541">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2541)" />
          <path d={svgPaths.p3c5a7580} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input22() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame130 />
        <Frame22 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel22 />
      <Input22 />
    </div>
  );
}

function PrimitiveLabel23() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2533">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2533)" />
          <path d={svgPaths.p2110df00} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input23() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame131 />
        <Frame23 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel23 />
      <Input23 />
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container29 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame132 />
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame133 />
    </div>
  );
}

function Frame285() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame284 />
      <Frame134 />
    </div>
  );
}

function Frame286() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame285 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_29.16%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.48%_62.5%_20.85%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.81%_37.5%_29.19%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.48%_20.84%_20.85%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Frame287() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container32 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan10() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton10() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan10 />
    </div>
  );
}

function Frame288() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame287 />
      <PrimitiveButton10 />
      <Frame287 />
    </div>
  );
}

function PrimitiveLabel24() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame135() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input24() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame135 />
        <Frame24 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel24 />
      <Input24 />
    </div>
  );
}

function PrimitiveLabel25() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame136() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input25() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame136 />
        <Frame25 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel25 />
      <Input25 />
    </div>
  );
}

function PrimitiveLabel26() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame137() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input26() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame137 />
        <Frame26 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel26 />
      <Input26 />
    </div>
  );
}

function Frame138() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container33 />
      <Container34 />
      <Container35 />
    </div>
  );
}

function Frame139() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame138 />
    </div>
  );
}

function Frame140() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame139 />
    </div>
  );
}

function Frame289() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame288 />
      <Frame140 />
    </div>
  );
}

function Frame290() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame289 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_16.67%_8.35%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.16%_37.5%_45.84%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Frame291() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame292() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container36 />
      <Frame291 />
    </div>
  );
}

function Frame293() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame292 />
    </div>
  );
}

function PrimitiveSpan11() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton11() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan11 />
    </div>
  );
}

function Frame294() {
  return (
    <div className="content-stretch flex gap-[77.604px] h-[28.806px] items-center relative shrink-0 w-[191.624px]">
      <Frame293 />
      <PrimitiveButton11 />
    </div>
  );
}

function PrimitiveLabel27() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input27() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame141 />
        <Frame27 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel27 />
      <Input27 />
    </div>
  );
}

function PrimitiveLabel28() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame142() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input28() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame142 />
        <Frame28 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel28 />
      <Input28 />
    </div>
  );
}

function PrimitiveLabel29() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame143() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input29() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame143 />
        <Frame29 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel29 />
      <Input29 />
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container37 />
      <Container38 />
      <Container39 />
    </div>
  );
}

function Frame145() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame144 />
    </div>
  );
}

function Frame146() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[202.947px]">
      <Frame145 />
    </div>
  );
}

function Frame295() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame294 />
      <Frame146 />
    </div>
  );
}

function Frame296() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame295 />
    </div>
  );
}

function Frame297() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame274 />
      <Frame282 />
      <Frame286 />
      <Frame290 />
      <Frame296 />
    </div>
  );
}

function Frame147() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame297 />
    </div>
  );
}

function Frame250() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame95 />
      <Frame147 />
    </div>
  );
}

function PrimitiveSpan12() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton12() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan12 />
    </div>
  );
}

function Frame148() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton12 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Wednesday</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.93%] left-[58.33%] right-1/4 top-[33.32%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_41.67%_54.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.7%] left-1/4 right-[58.33%] top-[12.47%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.8%_8.33%_8.36%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Frame298() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container40 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame299() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[123.685px]">
      <Frame298 />
    </div>
  );
}

function PrimitiveSpan13() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton13() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan13 />
    </div>
  );
}

function Frame300() {
  return (
    <div className="content-stretch flex gap-[36.622px] items-center justify-center relative shrink-0">
      <Frame299 />
      <PrimitiveButton13 />
    </div>
  );
}

function PrimitiveLabel30() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input30() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame149 />
        <Frame30 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel30 />
      <Input30 />
    </div>
  );
}

function PrimitiveLabel31() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input31() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame150 />
        <Frame31 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel31 />
      <Input31 />
    </div>
  );
}

function PrimitiveLabel32() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame151() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input32() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame151 />
        <Frame32 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel32 />
      <Input32 />
    </div>
  );
}

function Frame152() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container41 />
      <Container42 />
      <Container43 />
    </div>
  );
}

function Frame153() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame152 />
    </div>
  );
}

function Frame154() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame153 />
    </div>
  );
}

function Frame301() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame300 />
      <Frame154 />
    </div>
  );
}

function Frame302() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame301 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.47%_20.83%_8.36%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Frame303() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame304() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container44 />
      <Frame303 />
    </div>
  );
}

function Frame305() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame304 />
    </div>
  );
}

function PrimitiveSpan14() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton14() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan14 />
    </div>
  );
}

function Frame306() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame305 />
      <PrimitiveButton14 />
    </div>
  );
}

function Frame307() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame306 />
    </div>
  );
}

function Frame308() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame307 />
    </div>
  );
}

function PrimitiveLabel33() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame155() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input33() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame155 />
        <Frame33 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel33 />
      <Input33 />
    </div>
  );
}

function PrimitiveLabel34() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame156() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input34() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame156 />
        <Frame34 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel34 />
      <Input34 />
    </div>
  );
}

function PrimitiveLabel35() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame157() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input35() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame157 />
        <Frame35 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel35 />
      <Input35 />
    </div>
  );
}

function Frame158() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container45 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Frame159() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame158 />
    </div>
  );
}

function Frame160() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame159 />
    </div>
  );
}

function Frame309() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame308 />
      <Frame160 />
    </div>
  );
}

function Frame310() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame309 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.65%_41.67%_25.02%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[74.98%_37.5%_25.02%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.32%_8.33%_25.02%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.65%_20.83%_16.68%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.65%_62.5%_16.68%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Frame311() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container48 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan15() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton15() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan15 />
    </div>
  );
}

function Frame312() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame311 />
      <PrimitiveButton15 />
    </div>
  );
}

function PrimitiveLabel36() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame161() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input36() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame161 />
        <Frame36 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel36 />
      <Input36 />
    </div>
  );
}

function PrimitiveLabel37() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame162() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input37() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame162 />
        <Frame37 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel37 />
      <Input37 />
    </div>
  );
}

function PrimitiveLabel38() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame163() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input38() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame163 />
        <Frame38 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel38 />
      <Input38 />
    </div>
  );
}

function Frame164() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container49 />
      <Container50 />
      <Container51 />
    </div>
  );
}

function Frame165() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame164 />
    </div>
  );
}

function Frame166() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame165 />
    </div>
  );
}

function Frame313() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame312 />
      <Frame166 />
    </div>
  );
}

function Frame314() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame313 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.47%_62.5%_20.86%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.8%_37.5%_29.2%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.47%_20.84%_20.86%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Frame315() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container52 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan16() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton16() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan16 />
    </div>
  );
}

function Frame316() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame315 />
      <PrimitiveButton16 />
      <Frame315 />
    </div>
  );
}

function PrimitiveLabel39() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame167() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame39() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input39() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame167 />
        <Frame39 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel39 />
      <Input39 />
    </div>
  );
}

function PrimitiveLabel40() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame168() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input40() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame168 />
        <Frame40 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel40 />
      <Input40 />
    </div>
  );
}

function PrimitiveLabel41() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame169() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input41() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame169 />
        <Frame41 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel41 />
      <Input41 />
    </div>
  );
}

function Frame170() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container53 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Frame171() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame170 />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame171 />
    </div>
  );
}

function Frame317() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame316 />
      <Frame172 />
    </div>
  );
}

function Frame318() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame317 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_16.67%_8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.18%_37.5%_45.82%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Frame319() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame320() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container56 />
      <Frame319 />
    </div>
  );
}

function Frame321() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame320 />
    </div>
  );
}

function PrimitiveSpan17() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton17() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan17 />
    </div>
  );
}

function Frame322() {
  return (
    <div className="content-stretch flex gap-[77.604px] h-[28.806px] items-center relative shrink-0 w-[191.624px]">
      <Frame321 />
      <PrimitiveButton17 />
    </div>
  );
}

function PrimitiveLabel42() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame173() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2597">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2597)" />
          <path d={svgPaths.p34ed6840} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input42() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame173 />
        <Frame42 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel42 />
      <Input42 />
    </div>
  );
}

function PrimitiveLabel43() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame174() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2561">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2561)" />
          <path d={svgPaths.p1d38c280} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input43() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame174 />
        <Frame43 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel43 />
      <Input43 />
    </div>
  );
}

function PrimitiveLabel44() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame175() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2545">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2545)" />
          <path d={svgPaths.p32921ae0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input44() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame175 />
        <Frame44 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel44 />
      <Input44 />
    </div>
  );
}

function Frame176() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container57 />
      <Container58 />
      <Container59 />
    </div>
  );
}

function Frame177() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame176 />
    </div>
  );
}

function Frame178() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[202.947px]">
      <Frame177 />
    </div>
  );
}

function Frame323() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame322 />
      <Frame178 />
    </div>
  );
}

function Frame324() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame323 />
    </div>
  );
}

function Frame325() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame302 />
      <Frame310 />
      <Frame314 />
      <Frame318 />
      <Frame324 />
    </div>
  );
}

function Frame179() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame325 />
    </div>
  );
}

function Frame253() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame148 />
      <Frame179 />
    </div>
  );
}

function PrimitiveSpan18() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton18() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan18 />
    </div>
  );
}

function Frame180() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton18 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Thursday</p>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.91%] left-[58.33%] right-1/4 top-[33.34%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.19%_41.67%_54.15%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.67%] left-1/4 right-[58.33%] top-[12.49%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_8.33%_8.34%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Frame326() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container60 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame327() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame326 />
    </div>
  );
}

function PrimitiveSpan19() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton19() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan19 />
    </div>
  );
}

function Frame328() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[30.486px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton19 />
        </div>
      </div>
    </div>
  );
}

function Frame329() {
  return (
    <div className="content-stretch flex gap-[44.47px] items-center justify-center relative shrink-0">
      <Frame327 />
      <Frame328 />
    </div>
  );
}

function Frame330() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame329 />
    </div>
  );
}

function Frame331() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame330 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.49%_20.83%_8.34%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon17 />
    </div>
  );
}

function Frame332() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame333() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container61 />
      <Frame332 />
    </div>
  );
}

function Frame334() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame333 />
    </div>
  );
}

function PrimitiveSpan20() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton20() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan20 />
    </div>
  );
}

function Frame335() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame334 />
      <PrimitiveButton20 />
    </div>
  );
}

function Frame336() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame335 />
    </div>
  );
}

function Frame337() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame336 />
    </div>
  );
}

function PrimitiveLabel45() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame181() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2605">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2605)" />
          <path d={svgPaths.p2c13fac0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input45() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame181 />
        <Frame45 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel45 />
      <Input45 />
    </div>
  );
}

function PrimitiveLabel46() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame182() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2529">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2529)" />
          <path d={svgPaths.p2ea87900} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input46() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame182 />
        <Frame46 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel46 />
      <Input46 />
    </div>
  );
}

function PrimitiveLabel47() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame183() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2585">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2585)" />
          <path d={svgPaths.p22cf65e0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input47() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame183 />
        <Frame47 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel47 />
      <Input47 />
    </div>
  );
}

function Frame184() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container62 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Frame185() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame184 />
    </div>
  );
}

function Frame186() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame185 />
    </div>
  );
}

function Frame338() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame337 />
      <Frame186 />
    </div>
  );
}

function Frame339() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame338 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.67%_41.67%_24.99%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[75.01%_37.5%_24.99%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.34%_8.33%_24.99%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_20.83%_16.66%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_62.5%_16.66%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Frame340() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container65 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan21() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton21() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan21 />
    </div>
  );
}

function Frame341() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame340 />
      <PrimitiveButton21 />
    </div>
  );
}

function PrimitiveLabel48() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame187() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input48() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame187 />
        <Frame48 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel48 />
      <Input48 />
    </div>
  );
}

function PrimitiveLabel49() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame188() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input49() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame188 />
        <Frame49 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel49 />
      <Input49 />
    </div>
  );
}

function PrimitiveLabel50() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame189() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input50() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame189 />
        <Frame50 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel50 />
      <Input50 />
    </div>
  );
}

function Frame190() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container66 />
      <Container67 />
      <Container68 />
    </div>
  );
}

function Frame191() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame190 />
    </div>
  );
}

function Frame192() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame191 />
    </div>
  );
}

function Frame342() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame341 />
      <Frame192 />
    </div>
  );
}

function Frame343() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame342 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.19%_8.33%_29.15%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.49%_62.5%_20.84%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_37.5%_29.17%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.49%_20.84%_20.84%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Frame344() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container69 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan22() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton22() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan22 />
    </div>
  );
}

function Frame345() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame344 />
      <PrimitiveButton22 />
      <Frame344 />
    </div>
  );
}

function PrimitiveLabel51() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame193() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input51() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame193 />
        <Frame51 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel51 />
      <Input51 />
    </div>
  );
}

function PrimitiveLabel52() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame194() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input52() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame194 />
        <Frame52 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel52 />
      <Input52 />
    </div>
  );
}

function PrimitiveLabel53() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame195() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input53() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame195 />
        <Frame53 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel53 />
      <Input53 />
    </div>
  );
}

function Frame196() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container70 />
      <Container71 />
      <Container72 />
    </div>
  );
}

function Frame197() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame196 />
    </div>
  );
}

function Frame198() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame197 />
    </div>
  );
}

function Frame346() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame345 />
      <Frame198 />
    </div>
  );
}

function Frame347() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame346 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.34%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Frame348() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame349() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container73 />
      <Frame348 />
    </div>
  );
}

function Frame350() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame349 />
    </div>
  );
}

function PrimitiveSpan23() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton23() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan23 />
    </div>
  );
}

function Frame351() {
  return (
    <div className="content-stretch flex gap-[77.604px] h-[28.806px] items-center relative shrink-0 w-[191.624px]">
      <Frame350 />
      <PrimitiveButton23 />
    </div>
  );
}

function PrimitiveLabel54() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame199() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input54() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame199 />
        <Frame54 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel54 />
      <Input54 />
    </div>
  );
}

function PrimitiveLabel55() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame200() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input55() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame200 />
        <Frame55 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel55 />
      <Input55 />
    </div>
  );
}

function PrimitiveLabel56() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame201() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input56() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame201 />
        <Frame56 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel56 />
      <Input56 />
    </div>
  );
}

function Frame202() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container74 />
      <Container75 />
      <Container76 />
    </div>
  );
}

function Frame203() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame202 />
    </div>
  );
}

function Frame204() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[202.947px]">
      <Frame203 />
    </div>
  );
}

function Frame352() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame351 />
      <Frame204 />
    </div>
  );
}

function Frame353() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame352 />
    </div>
  );
}

function Frame354() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame331 />
      <Frame339 />
      <Frame343 />
      <Frame347 />
      <Frame353 />
    </div>
  );
}

function Frame205() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame354 />
    </div>
  );
}

function Frame254() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame180 />
      <Frame205 />
    </div>
  );
}

function PrimitiveSpan24() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton24() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan24 />
    </div>
  );
}

function Frame206() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton24 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Friday</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.92%] left-[58.33%] right-1/4 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.18%_41.67%_54.15%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.68%] left-1/4 right-[58.33%] top-[12.48%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.82%_8.33%_8.35%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Frame355() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container77 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame356() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[123.685px]">
      <Frame355 />
    </div>
  );
}

function PrimitiveSpan25() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton25() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan25 />
    </div>
  );
}

function Frame357() {
  return (
    <div className="content-stretch flex gap-[36.622px] items-center justify-center relative shrink-0">
      <Frame356 />
      <PrimitiveButton25 />
    </div>
  );
}

function PrimitiveLabel57() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame207() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input57() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame207 />
        <Frame57 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel57 />
      <Input57 />
    </div>
  );
}

function PrimitiveLabel58() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame208() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input58() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame208 />
        <Frame58 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel58 />
      <Input58 />
    </div>
  );
}

function PrimitiveLabel59() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame209() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input59() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame209 />
        <Frame59 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel59 />
      <Input59 />
    </div>
  );
}

function Frame210() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container78 />
      <Container79 />
      <Container80 />
    </div>
  );
}

function Frame211() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame210 />
    </div>
  );
}

function Frame212() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame211 />
    </div>
  );
}

function Frame358() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame357 />
      <Frame212 />
    </div>
  );
}

function Frame359() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame358 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.48%_20.83%_8.35%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Frame360() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame361() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container81 />
      <Frame360 />
    </div>
  );
}

function Frame362() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame361 />
    </div>
  );
}

function PrimitiveSpan26() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton26() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan26 />
    </div>
  );
}

function Frame363() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame362 />
      <PrimitiveButton26 />
    </div>
  );
}

function Frame364() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame363 />
    </div>
  );
}

function Frame365() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame364 />
    </div>
  );
}

function PrimitiveLabel60() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame213() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input60() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame213 />
        <Frame60 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel60 />
      <Input60 />
    </div>
  );
}

function PrimitiveLabel61() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame214() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input61() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame214 />
        <Frame61 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel61 />
      <Input61 />
    </div>
  );
}

function PrimitiveLabel62() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame215() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input62() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame215 />
        <Frame62 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel62 />
      <Input62 />
    </div>
  );
}

function Frame216() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container82 />
      <Container83 />
      <Container84 />
    </div>
  );
}

function Frame217() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame216 />
    </div>
  );
}

function Frame218() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame217 />
    </div>
  );
}

function Frame366() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame365 />
      <Frame218 />
    </div>
  );
}

function Frame367() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame366 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[8.33%] right-[41.67%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[58.33%] right-[8.33%] top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.66%_20.83%_16.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.66%_62.5%_16.67%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Frame368() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container85 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan27() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton27() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan27 />
    </div>
  );
}

function Frame369() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame368 />
      <PrimitiveButton27 />
    </div>
  );
}

function PrimitiveLabel63() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame219() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame63() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input63() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame219 />
        <Frame63 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel63 />
      <Input63 />
    </div>
  );
}

function PrimitiveLabel64() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame220() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input64() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame220 />
        <Frame64 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel64 />
      <Input64 />
    </div>
  );
}

function PrimitiveLabel65() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame221() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input65() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame221 />
        <Frame65 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel65 />
      <Input65 />
    </div>
  );
}

function Frame222() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container86 />
      <Container87 />
      <Container88 />
    </div>
  );
}

function Frame223() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame222 />
    </div>
  );
}

function Frame224() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame223 />
    </div>
  );
}

function Frame370() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame369 />
      <Frame224 />
    </div>
  );
}

function Frame371() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame370 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.18%_8.33%_29.15%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.48%_62.5%_20.85%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.82%_37.5%_29.18%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.48%_20.84%_20.85%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Frame372() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container89 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan28() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton28() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan28 />
    </div>
  );
}

function Frame373() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame372 />
      <PrimitiveButton28 />
      <Frame372 />
    </div>
  );
}

function PrimitiveLabel66() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame225() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input66() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame225 />
        <Frame66 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel66 />
      <Input66 />
    </div>
  );
}

function PrimitiveLabel67() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame226() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input67() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame226 />
        <Frame67 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel67 />
      <Input67 />
    </div>
  );
}

function PrimitiveLabel68() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame227() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input68() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame227 />
        <Frame68 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel68 />
      <Input68 />
    </div>
  );
}

function Frame228() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container90 />
      <Container91 />
      <Container92 />
    </div>
  );
}

function Frame229() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame228 />
    </div>
  );
}

function Frame230() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame229 />
    </div>
  );
}

function Frame374() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame373 />
      <Frame230 />
    </div>
  );
}

function Frame375() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame374 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_16.67%_8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.18%_37.5%_45.82%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Frame376() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame377() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container93 />
      <Frame376 />
    </div>
  );
}

function Frame378() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame377 />
    </div>
  );
}

function Frame379() {
  return (
    <div className="content-stretch flex items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Frame378 />
    </div>
  );
}

function PrimitiveSpan29() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton29() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan29 />
    </div>
  );
}

function Frame380() {
  return (
    <div className="content-stretch flex gap-[27.903px] items-center justify-center relative shrink-0">
      <Frame379 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton29 />
        </div>
      </div>
    </div>
  );
}

function Frame381() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame380 />
    </div>
  );
}

function Frame382() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame381 />
    </div>
  );
}

function Frame383() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame359 />
      <Frame367 />
      <Frame371 />
      <Frame375 />
      <Frame382 />
    </div>
  );
}

function Frame231() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame383 />
    </div>
  );
}

function Frame255() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame206 />
      <Frame231 />
    </div>
  );
}

function PrimitiveSpan30() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton30() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan30 />
    </div>
  );
}

function Frame232() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton30 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Saturday</p>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.93%] left-[58.33%] right-1/4 top-[33.32%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_41.67%_54.16%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.69%] left-1/4 right-[58.33%] top-[12.47%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.81%_8.33%_8.36%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon26 />
    </div>
  );
}

function Frame384() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container94 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame385() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame384 />
    </div>
  );
}

function PrimitiveSpan31() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton31() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan31 />
    </div>
  );
}

function Frame386() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[30.486px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton31 />
        </div>
      </div>
    </div>
  );
}

function Frame387() {
  return (
    <div className="content-stretch flex gap-[44.47px] items-center justify-center relative shrink-0">
      <Frame385 />
      <Frame386 />
    </div>
  );
}

function Frame388() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame387 />
    </div>
  );
}

function Frame389() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame388 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.47%_20.83%_8.36%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Frame390() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame391() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container95 />
      <Frame390 />
    </div>
  );
}

function Frame392() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame391 />
    </div>
  );
}

function PrimitiveSpan32() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton32() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan32 />
    </div>
  );
}

function Frame393() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[195.979px]">
      <Frame392 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton32 />
        </div>
      </div>
    </div>
  );
}

function Frame394() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame393 />
    </div>
  );
}

function Frame395() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame394 />
    </div>
  );
}

function Frame396() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame395 />
    </div>
  );
}

function Frame397() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[214.27px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame396 />
    </div>
  );
}

function Frame398() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame397 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.66%_41.67%_25.01%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[74.99%_37.5%_25.01%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.32%_8.33%_25.01%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.65%_20.83%_16.68%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.65%_62.5%_16.68%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Frame399() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container96 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan33() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton33() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan33 />
    </div>
  );
}

function Frame400() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame399 />
      <PrimitiveButton33 />
    </div>
  );
}

function PrimitiveLabel69() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame233() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input69() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame233 />
        <Frame69 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel69 />
      <Input69 />
    </div>
  );
}

function PrimitiveLabel70() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame401() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input70() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame401 />
        <Frame70 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel70 />
      <Input70 />
    </div>
  );
}

function PrimitiveLabel71() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame402() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input71() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame402 />
        <Frame71 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel71 />
      <Input71 />
    </div>
  );
}

function Frame403() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container97 />
      <Container98 />
      <Container99 />
    </div>
  );
}

function Frame404() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame403 />
    </div>
  );
}

function Frame405() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame404 />
    </div>
  );
}

function Frame406() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame400 />
      <Frame405 />
    </div>
  );
}

function Frame407() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame406 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.17%_8.33%_29.16%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.47%_62.5%_20.86%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.81%_37.5%_29.19%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.47%_20.84%_20.86%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Frame408() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container100 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan34() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton34() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan34 />
    </div>
  );
}

function Frame409() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame408 />
      <PrimitiveButton34 />
      <Frame408 />
    </div>
  );
}

function PrimitiveLabel72() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame410() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2593">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2593)" />
          <path d={svgPaths.p10fd6880} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input72() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame410 />
        <Frame72 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel72 />
      <Input72 />
    </div>
  );
}

function PrimitiveLabel73() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame411() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2601">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2601)" />
          <path d={svgPaths.p28631fa8} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input73() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame411 />
        <Frame73 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel73 />
      <Input73 />
    </div>
  );
}

function PrimitiveLabel74() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame412() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2517">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2517)" />
          <path d={svgPaths.p15769ec0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input74() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame412 />
        <Frame74 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel74 />
      <Input74 />
    </div>
  );
}

function Frame413() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container101 />
      <Container102 />
      <Container103 />
    </div>
  );
}

function Frame414() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame413 />
    </div>
  );
}

function Frame415() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame414 />
    </div>
  );
}

function Frame416() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame409 />
      <Frame415 />
    </div>
  );
}

function Frame417() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame416 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.34%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon30 />
    </div>
  );
}

function Frame418() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame419() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container104 />
      <Frame418 />
    </div>
  );
}

function Frame420() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame419 />
    </div>
  );
}

function Frame421() {
  return (
    <div className="content-stretch flex items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Frame420 />
    </div>
  );
}

function PrimitiveSpan35() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton35() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan35 />
    </div>
  );
}

function Frame422() {
  return (
    <div className="content-stretch flex gap-[27.903px] items-center justify-center relative shrink-0">
      <Frame421 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton35 />
        </div>
      </div>
    </div>
  );
}

function Frame423() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame422 />
    </div>
  );
}

function Frame424() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame423 />
    </div>
  );
}

function Frame425() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame389 />
      <Frame398 />
      <Frame407 />
      <Frame417 />
      <Frame424 />
    </div>
  );
}

function Frame426() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame425 />
    </div>
  );
}

function Frame251() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1075px]">
      <Frame232 />
      <Frame426 />
    </div>
  );
}

function PrimitiveSpan36() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton36() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan36 />
    </div>
  );
}

function Frame427() {
  return (
    <div className="content-stretch flex gap-[17.439px] h-[20.95px] items-start relative shrink-0 w-[134.137px]">
      <PrimitiveButton36 />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15.259px] not-italic relative shrink-0 text-[13.951px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">Every Sunday</p>
    </div>
  );
}

function Icon31() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[47.91%] left-[58.33%] right-1/4 top-[33.34%]" data-name="Vector">
        <div className="absolute inset-[-22.2%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p2e732dc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.19%_41.67%_54.14%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 4">
            <path d={svgPaths.p22871880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[41.67%] left-1/4 right-[58.33%] top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-9.08%_-26.78%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 7">
            <path d={svgPaths.p159157c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_8.33%_8.34%_7.9%]" data-name="Vector">
        <div className="absolute inset-[-5.88%_-5.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 10">
            <path d={svgPaths.p6a44400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[20.904px]" data-name="Container">
      <Icon31 />
    </div>
  );
}

function Frame428() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[120.846px]">
      <Container105 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 tracking-[-0.1036px] w-[95.812px]">Detailing / Hand Wash</p>
    </div>
  );
}

function Frame429() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame428 />
    </div>
  );
}

function PrimitiveSpan37() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton37() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan37 />
    </div>
  );
}

function Frame430() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[30.486px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton37 />
        </div>
      </div>
    </div>
  );
}

function Frame431() {
  return (
    <div className="content-stretch flex gap-[44.47px] items-center justify-center relative shrink-0">
      <Frame429 />
      <Frame430 />
    </div>
  );
}

function Frame432() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame431 />
    </div>
  );
}

function Frame433() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame432 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%_8.34%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-7.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
            <path d={svgPaths.pcc23c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon32 />
    </div>
  );
}

function Frame434() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Self-Service</p>
    </div>
  );
}

function Frame435() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container106 />
      <Frame434 />
    </div>
  );
}

function Frame436() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame435 />
    </div>
  );
}

function PrimitiveSpan38() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton38() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan38 />
    </div>
  );
}

function Frame437() {
  return (
    <div className="content-stretch flex gap-[82.836px] items-center relative shrink-0 w-[202.947px]">
      <Frame436 />
      <PrimitiveButton38 />
    </div>
  );
}

function Frame438() {
  return (
    <div className="bg-white content-stretch flex items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Frame437 />
    </div>
  );
}

function Frame439() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[203.818px]">
      <Frame438 />
    </div>
  );
}

function PrimitiveLabel75() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame440() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input75() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame440 />
        <Frame75 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel75 />
      <Input75 />
    </div>
  );
}

function PrimitiveLabel76() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame441() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input76() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame441 />
        <Frame76 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel76 />
      <Input76 />
    </div>
  );
}

function PrimitiveLabel77() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame442() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame77() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input77() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame442 />
        <Frame77 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel77 />
      <Input77 />
    </div>
  );
}

function Frame443() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container107 />
      <Container108 />
      <Container109 />
    </div>
  );
}

function Frame444() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame443 />
    </div>
  );
}

function Frame445() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[189.882px]">
      <Frame444 />
    </div>
  );
}

function Frame446() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame439 />
      <Frame445 />
    </div>
  );
}

function Frame447() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame446 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[16.68%_41.67%_24.99%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-8.28%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9">
            <path d={svgPaths.p361d0700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[75.01%_37.5%_24.99%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.57%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M3.53469 0.502413H0.502413" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[33.34%_8.33%_24.99%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-12.43%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 7">
            <path d={svgPaths.p374b3300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.68%_20.83%_16.66%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.68%_62.5%_16.66%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-24.85%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p36f99080} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col h-[21.822px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.775px]" data-name="Container">
      <Icon33 />
    </div>
  );
}

function Frame448() {
  return (
    <div className="bg-white content-stretch flex gap-[4.134px] items-center pl-0 pr-[4.134px] py-[4.134px] relative rounded-[4.651px] shrink-0 w-[115.845px]">
      <Container110 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Tunnel / Conveyor</p>
    </div>
  );
}

function PrimitiveSpan39() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton39() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan39 />
    </div>
  );
}

function Frame449() {
  return (
    <div className="content-stretch flex gap-[48.83px] items-center relative shrink-0 w-[202.076px]">
      <Frame448 />
      <PrimitiveButton39 />
    </div>
  );
}

function PrimitiveLabel78() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame450() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame78() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input78() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame450 />
        <Frame78 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel78 />
      <Input78 />
    </div>
  );
}

function PrimitiveLabel79() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame451() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame79() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input79() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame451 />
        <Frame79 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel79 />
      <Input79 />
    </div>
  );
}

function PrimitiveLabel80() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame452() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame80() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input80() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame452 />
        <Frame80 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel80 />
      <Input80 />
    </div>
  );
}

function Frame453() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container111 />
      <Container112 />
      <Container113 />
    </div>
  );
}

function Frame454() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame453 />
    </div>
  );
}

function Frame455() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame454 />
    </div>
  );
}

function Frame456() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[213.399px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame449 />
      <Frame455 />
    </div>
  );
}

function Frame457() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[213.399px]">
      <Frame456 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="h-[12.071px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[29.19%_8.33%_29.14%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-9.99%_-5.01%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
            <path d={svgPaths.p3c04fa80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_62.5%_20.84%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_37.5%_29.17%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-0.5px_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1">
            <path d="M0.502413 0.502413H3.51104" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_20.84%_20.84%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-24.97%_-25.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p22c82500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.00483" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="content-stretch flex flex-col h-[21.728px] items-start pb-0 pt-[4.823px] px-[4.823px] relative rounded-[6.029px] shrink-0 w-[21.681px]" data-name="Container">
      <Icon34 />
    </div>
  );
}

function Frame458() {
  return (
    <div className="content-stretch flex gap-[4.134px] items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Container114 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">In-Bay / Roll-Over</p>
    </div>
  );
}

function PrimitiveSpan40() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton40() {
  return (
    <div className="bg-[#00bf10] content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] shrink-0 w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan40 />
    </div>
  );
}

function Frame459() {
  return (
    <div className="content-stretch flex gap-[25.287px] items-center relative shrink-0 w-[195.979px]">
      <Frame458 />
      <PrimitiveButton40 />
      <Frame458 />
    </div>
  );
}

function PrimitiveLabel81() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">From:</p>
      </div>
    </div>
  );
}

function Frame460() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">{`08:00 `}</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input81() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame460 />
        <Frame81 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel81 />
      <Input81 />
    </div>
  );
}

function PrimitiveLabel82() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">To:</p>
      </div>
    </div>
  );
}

function Frame461() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[41.809px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[50.519px]">24:00</p>
    </div>
  );
}

function Frame82() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2569">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2569)" />
          <path d={svgPaths.p7249200} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input82() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[60.1px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[60.1px]">
        <Frame461 />
        <Frame82 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container116() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[59.229px]" data-name="Container">
      <PrimitiveLabel82 />
      <Input82 />
    </div>
  );
}

function PrimitiveLabel83() {
  return (
    <div className="h-[15.276px] relative shrink-0 w-[29.492px]" data-name="Primitive.label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.276px] items-center relative w-[29.492px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15.259px] not-italic relative shrink-0 text-[10.681px] text-neutral-950 text-nowrap tracking-[-0.0156px] whitespace-pre">{`Station `}</p>
      </div>
    </div>
  );
}

function Frame462() {
  return (
    <div className="content-stretch flex items-center justify-center mr-[-9.592px] relative shrink-0 w-[25.26px]">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15.259px] not-italic relative shrink-0 text-[#080808] text-[10.681px] tracking-[-0.0156px] w-[26.131px]">6</p>
    </div>
  );
}

function Frame83() {
  return (
    <div className="h-[27.06px] mr-[-9.592px] relative shrink-0 w-[18.291px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 28">
        <g id="Frame 1000004184">
          <mask fill="white" id="path-1-inside-1_29049_2565">
            <path d="M0 0H18.2914V27.0598H0V0Z" />
          </mask>
          <path d={svgPaths.p3510ec80} fill="var(--stroke-0, black)" fillOpacity="0.15" mask="url(#path-1-inside-1_29049_2565)" />
          <path d={svgPaths.p2ba8efc0} id="Vector" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
          <path d={svgPaths.p15f6b150} id="Vector_2" stroke="var(--stroke-0, #50565D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.74392" />
        </g>
      </svg>
    </div>
  );
}

function Input83() {
  return (
    <div className="bg-white h-[27.06px] relative rounded-[5.886px] shrink-0 w-[47.035px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[27.06px] items-center overflow-clip pl-[9.156px] pr-[18.748px] py-[3.052px] relative rounded-[inherit] w-[47.035px]">
        <Frame462 />
        <Frame83 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.872px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[5.886px]" />
    </div>
  );
}

function Container117() {
  return (
    <div className="content-stretch flex flex-col gap-[6.104px] h-[49.755px] items-start justify-center relative shrink-0 w-[47.035px]" data-name="Container">
      <PrimitiveLabel83 />
      <Input83 />
    </div>
  );
}

function Frame463() {
  return (
    <div className="content-stretch flex gap-[12.207px] items-center relative shrink-0">
      <Container115 />
      <Container116 />
      <Container117 />
    </div>
  );
}

function Frame464() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <Frame463 />
    </div>
  );
}

function Frame465() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[190.753px]">
      <Frame464 />
    </div>
  );
}

function Frame466() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[207.302px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame459 />
      <Frame465 />
    </div>
  );
}

function Frame467() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[207.302px]">
      <Frame466 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="h-[12.73px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_16.67%_8.35%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-4.99%_-6.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 12">
            <path d={svgPaths.p2c672400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.16%_37.5%_45.84%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-16.7%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p57f9a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.05967" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col h-[22.914px] items-start pb-0 pt-[5.086px] px-[5.086px] relative rounded-[6.358px] shrink-0 w-[22.864px]" data-name="Container">
      <Icon35 />
    </div>
  );
}

function Frame468() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[9.646px] not-italic relative shrink-0 text-[9.646px] text-neutral-950 text-nowrap tracking-[-0.1036px] whitespace-pre">Mobile / On-Demand</p>
    </div>
  );
}

function Frame469() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-center relative shrink-0 w-full">
      <Container118 />
      <Frame468 />
    </div>
  );
}

function Frame470() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82.747px]">
      <Frame469 />
    </div>
  );
}

function Frame471() {
  return (
    <div className="content-stretch flex items-center pb-[4.36px] pl-0 pr-[4.134px] pt-[4.134px] relative rounded-[4.651px] shrink-0 w-[133.266px]">
      <Frame470 />
    </div>
  );
}

function PrimitiveSpan41() {
  return (
    <div className="bg-white h-[15.494px] relative rounded-[1.85475e+07px] shrink-0 w-[15.461px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[15.494px] w-[15.461px]" />
    </div>
  );
}

function PrimitiveButton41() {
  return (
    <div className="bg-black content-stretch flex h-[17.811px] items-center justify-center pl-[14.372px] pr-[1.106px] py-[1.106px] relative rounded-[1.85475e+07px] w-[30.921px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.106px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[1.85475e+07px]" />
      <PrimitiveSpan41 />
    </div>
  );
}

function Frame472() {
  return (
    <div className="content-stretch flex gap-[27.903px] items-center justify-center relative shrink-0">
      <Frame471 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <PrimitiveButton41 />
        </div>
      </div>
    </div>
  );
}

function Frame473() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[11.335px] py-[9.592px] relative rounded-[14.823px] shrink-0 w-[210.786px]">
      <div aria-hidden="true" className="absolute border-[#dedede] border-[0.872px] border-solid inset-0 pointer-events-none rounded-[14.823px]" />
      <Frame472 />
    </div>
  );
}

function Frame474() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[210.786px]">
      <Frame473 />
    </div>
  );
}

function Frame475() {
  return (
    <div className="content-stretch flex gap-[4.36px] items-start relative shadow-[0px_3.488px_3.488px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <Frame433 />
      <Frame447 />
      <Frame457 />
      <Frame467 />
      <Frame474 />
    </div>
  );
}

function Frame476() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[1105.32px]">
      <Frame475 />
    </div>
  );
}

function Frame252() {
  return (
    <div className="content-stretch flex flex-col gap-[12.207px] items-start justify-center relative shrink-0 w-[1079px]">
      <Frame427 />
      <Frame476 />
    </div>
  );
}

function Frame256() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start px-0 py-[9.592px] relative shrink-0 w-[1076px]">
      <Frame249 />
      <Frame250 />
      <Frame253 />
      <Frame254 />
      <Frame255 />
      <Frame251 />
      <Frame252 />
    </div>
  );
}

function Frame477() {
  return (
    <div className="relative shrink-0 w-[1077px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center relative w-[1077px]">
        <Frame256 />
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center p-px relative rounded-[12.75px] size-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[12.75px]" />
      <CardHeader />
      <Frame477 />
    </div>
  );
}