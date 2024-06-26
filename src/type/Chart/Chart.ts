// 날짜별 게시글 수 데이터 타입
export type LineChartDTO = {
  dateData: {
    date: string;
    count: number;
  }[];
};

// 해시태그별 게시글 수 데이터 타입
interface TagCountData {
  tag: string;
  count: number;
}

export interface BlockChartDTO {
  data: TagCountData[];
}
// 보여줄 데이터 타입
export type PostStackChartDTO = {
  created_at: Date;
  boardType: string;
};

// 변환된 데이터 타입
export type TransformedDataDTO = {
  date: string;
  자유게시판: number;
  질문게시판: number;
  기타게시판: number;
  [key: string]: string | number | undefined;
};

// 스택된 데이터 타입
export type StackedDataDTO = {
  date: string;
  자유게시판?: number;
  질문게시판?: number;
  기타게시판?: number;
  [key: string]: string | number | undefined;
};

// 차트 데이터 타입
export type ChartDataDTO = {
  date: string;
  자유게시판: number;
  질문게시판: number;
  기타게시판: number;
  [key: string]: string | number | undefined;
};

export interface StackedData extends TransformedDataDTO {}
export type StackProps = {
  data: StackedDataDTO[];
};
