import { useLazySearchScholarshipsQuery } from "@/state/api";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";

type InitialDataType = {
  data: Scholarship[];
  totalResult: number;
  status: boolean;
  pageNo: number;
  totalPages: number;
};

const initialData: InitialDataType = {
  data: [],
  totalResult: 0,
  status: true,
  pageNo: 0,
  totalPages: 1,
};

const usePagination = () => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState<Scholarship[]>(initialData.data);
  const [totalResult, setTotalResult] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const params = useLocalSearchParams<{
    keyword?: string;
    studyLevel?: string;
    scholarshipType?: string;
    country?: string;
    university?: string;
    fields?: string;
  }>();

  const [getScholarships] = useLazySearchScholarshipsQuery();

  const fetchScholarships = async (
    page: number,
    perPage: 5,
    keyword = params.keyword || "",
    studyLevel = params.studyLevel || "",
    scholarshipType = params.scholarshipType || "",
    country = params.country || "",
    university = params.university || "",
    fields = params.fields || ""
  ) => {
    try {
      const response = await getScholarships({
        page,
        size: perPage,
        keyword,
        minGpa: 0,
        maxGpa: 4,
        criteria: {
          studyLevel,
          scholarshipType,
          country,
          university,
          fields,
        },
      }).unwrap();

      const result = {
        data: response?.scholarship as Scholarship[],
        totalResult: response?.totalElements || 0,
        status: true,
        pageNo: page,
        totalPages: response?.totalPages || 10,
      };

      if (result.status) {
        setData(page === 0 ? result.data : [...data, ...result.data]);
        setTotalResult(result.totalResult);
        setPageNo(result.pageNo);
        setTotalPages(result.totalPages);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
    }
  };

  // Initial fetch and when params change
  useEffect(() => {
    setInitialLoader(true);
    setPageNo(0); // Reset to first page when filters change
    fetchScholarships(
      0,
      5,
      params.keyword || "",
      params.studyLevel || "",
      params.scholarshipType || "",
      params.country || "",
      params.university || "",
      params.fields || ""
    );
  }, [
    params.keyword,
    params.studyLevel,
    params.scholarshipType,
    params.country,
    params.university,
    params.fields,
  ]);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScholarships(
      0,
      5,
      params.keyword || "",
      params.studyLevel || "",
      params.scholarshipType || "",
      params.country || "",
      params.university || "",
      params.fields || ""
    );
  }, [
    params.keyword,
    params.studyLevel,
    params.scholarshipType,
    params.country,
    params.university,
    params.fields,
  ]);

  // Load more data
  const loadMore = useCallback(() => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      fetchScholarships(
        pageNo + 1,
        5,
        params.keyword || "",
        params.studyLevel || "",
        params.scholarshipType || "",
        params.country || "",
        params.university || "",
        params.fields || ""
      );
    }
  }, [
    loadingMore,
    pageNo,
    totalPages,
    params.keyword,
    params.studyLevel,
    params.scholarshipType,
    params.country,
    params.university,
    params.fields,
  ]);

  return {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  };
};

export default usePagination;
