'use client';

import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/pattern/cus/sheet';
import { X } from 'lucide-react';

interface ScholarshipAnalysisDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisData?: ScholarshipAnalysis;
  isLoading: boolean;
  scholarshipTitle: string;
}

export default function ScholarshipAnalysisDialog({
  open,
  onOpenChange,
  analysisData,
  isLoading,
  scholarshipTitle,
}: ScholarshipAnalysisDialogProps) {
  const t = useTranslations('scholarshipDetail.analysis');

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full p-3 sm:p-4 sm:max-w-3xl max-h-[95vh] overflow-y-auto [&>button]:hidden rounded-none sm:rounded-xl !right-0 sm:!right-4 !top-0 sm:!top-1/2 !-translate-y-0 sm:!-translate-y-1/2 scrollbar-hide"
      >
        <SheetHeader className="!p-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-base sm:text-lg font-bold text-gray-900">
                {t('title') || 'Scholarship Analysis'}
              </SheetTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                {scholarshipTitle}
              </p>
            </div>
            <SheetClose className="rounded-full bg-white p-2 shadow-lg ring-1 ring-gray-200 transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0 self-start sm:self-auto">
              <X className="h-4 w-4 text-gray-700" />
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-4 sm:space-y-6 ">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
              <p className="text-sm sm:text-base text-gray-600">
                {t('loading') || 'Analyzing scholarship...'}
              </p>
            </div>
          ) : analysisData ? (
            <>
              {/* Recommendations */}
              {analysisData.recommendations && analysisData.recommendations.length > 0 && (
                <>
                  {analysisData.recommendations.map((rec, index) => (
                    <section key={index}>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                        {t('analysisResult')}
                      </h3>
                      <div className="bg-white rounded-lg border-2 border-gray-200 p-2.5 sm:p-3 mb-3 sm:mb-4 space-y-3 sm:space-y-4">
                        {/* Match Reasons */}
                        {rec.match_reasons && rec.match_reasons.length > 0 && (
                          <div className="bg-gray-100 rounded-md p-2.5 sm:p-3">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                              {t('matchReasons') || 'Match Reasons'}
                            </h4>
                            <div className="space-y-1">
                              {rec.match_reasons.map((reason, i) => (
                                <p
                                  key={i}
                                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                                >
                                  • {reason}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Student Strengths */}
                        {rec.student_strengths && rec.student_strengths.length > 0 && (
                          <div className="bg-gray-100 rounded-md p-2.5 sm:p-3">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                              {t('studentStrengths') || 'Student Strengths'}
                            </h4>
                            <div className="space-y-1">
                              {rec.student_strengths.map((strength, i) => (
                                <p
                                  key={i}
                                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                                >
                                  • {strength}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Improvement Areas */}
                        {rec.improvement_areas && rec.improvement_areas.length > 0 && (
                          <div className="bg-gray-100 rounded-md p-2.5 sm:p-3">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                              {t('improvementAreas') || 'Areas for Improvement'}
                            </h4>
                            <div className="space-y-1">
                              {rec.improvement_areas.map((area, i) => (
                                <p
                                  key={i}
                                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                                >
                                  • {area}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Application Tips */}
                        {rec.application_tips && rec.application_tips.length > 0 && (
                          <div className="bg-gray-100 rounded-md p-2.5 sm:p-3">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                              {t('applicationTips') || 'Application Tips'}
                            </h4>
                            <div className="space-y-1">
                              {rec.application_tips.map((tip, i) => (
                                <p
                                  key={i}
                                  className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                                >
                                  • {tip}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  ))}
                </>
              )}

              {/* Overall Strategy */}
              {analysisData.overall_strategy && (
                <section>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    {t('overallStrategy') || 'Overall Strategy'}
                  </h3>
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-2.5 sm:p-3 mb-3 sm:mb-4">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {analysisData.overall_strategy}
                    </p>
                  </div>
                </section>
              )}

              {/* Timeline */}
              {analysisData.timeline && analysisData.timeline.length > 0 && (
                <section>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    {t('timeline') || 'Timeline'}
                  </h3>
                  <div className="bg-white rounded-lg border-2 border-gray-200 p-2.5 sm:p-3 mb-3 sm:mb-4 space-y-2">
                    {analysisData.timeline.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                      >
                        <span className="font-semibold text-gray-900 flex-shrink-0">{i + 1}.</span>
                        <span className="flex-1 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <span className="text-lg sm:text-xl text-gray-400">⚠</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {t('noData') || 'No analysis data available'}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
