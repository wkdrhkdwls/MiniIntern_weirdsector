import { useEffect, useRef } from 'react';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { useResize } from '@/hooks/useResize';
import { BlockChartDTO } from '@/type/Chart/Chart';

const TagPostsBlockChart = ({ data }: BlockChartDTO) => {
  // svg 엘리먼트와 root 엘리먼트의 ref
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);
  // 창 크기 변경 감지 후 차트 그리기
  const size = useResize(rootRef);

  // 차트의 패딩
  const PADDING = 50;

  useEffect(() => {
    // 창 크기가 없거나 데이터가 없으면 그리지 않음
    if (!size || !data.length) {
      return;
    }
    // 차트의 너비와 높이
    const { width, height } = size;

    // svg 엘리먼트 선택
    const svg = select(svgRef.current);
    const legend = select(legendRef.current);

    // y축 도메인을 위한 최대 카운트 계산
    const maxCount = Math.max(...data.map((d) => d.count));

    // x축 스케일 설정
    const xScale = scaleBand()
      .domain(data.map((d) => `#${d.tag}`))
      .range([PADDING, Math.max(width, data.length * 100) - PADDING]) // 데이터 양에 따라 동적 설정
      .padding(0.4);

    // y축 스케일 설정(선형)
    const yScale = scaleLinear()
      .domain([0, maxCount])
      .range([height - PADDING, PADDING]);

    // x축 생성
    const xAxis = axisBottom(xScale);
    svg
      .select<SVGGElement>('.x-axis')
      .style('transform', `translateY(${height - PADDING}px)`)
      .call(xAxis);

    // y축 생성(눈금)
    const yAxis = axisLeft(yScale)
      .ticks(7)
      .tickSize(-Math.max(width, data.length * 100) + 2 * PADDING); // 동적 설정
    svg
      .select<SVGGElement>('.y-axis')
      .style('transform', `translateX(${PADDING}px)`)
      .call(yAxis)
      .selectAll('line')
      .attr('stroke', '#ddd')
      .attr('stroke-dasharray', '4 2'); // 점선으로 설정

    // 막대 그래프 그리기
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(`#${d.tag}`) ?? 0)
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - PADDING - yScale(d.count))
      .attr('fill', '#f99');

    // 범례 추가
    legend.selectAll('*').remove();
    const legendGroup = legend
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150}, 20)`);

    legendGroup.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 6).style('fill', '#f99');

    legendGroup
      .append('text')
      .attr('x', 10)
      .attr('y', 0)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text('게시물 등록수');
  }, [data, size]);

  return (
    <div ref={rootRef} className="w-full min-h-64 border border-[#eee] p-4">
      <h2 className="font-bold">해시태그별 게시글 등록 수</h2>
      <svg ref={legendRef} className="legend-svg w-full" width={200} height={50}></svg>
      <div className="overflow-x-auto">
        <svg ref={svgRef} width={Math.max(size.width, data.length * 100)} height={size.height}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
};

export default TagPostsBlockChart;
