from scholarship_matcher import ScholarshipMatcher
from scholarship_query import ScholarshipQuery

query = ScholarshipQuery()

match = ScholarshipMatcher()

if __name__ == "__main__":
    #results = query.get_scholarship(all=False, scholarship_id=1)
    results = match.application_scholarship_match(1)
    
    print(results)