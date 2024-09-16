import axios, { AxiosResponse } from 'axios';
import { promises as fs } from 'fs';

type ClusterType = "SKILLS_ON_PROFILE" | "SKILLS_NOT_ON_PROFIL";

interface ResultElement {
    title: {
        text: string
    }
};

interface SearchResultElement {
    clusterType: ClusterType,
    results: ResultElement[]
};

interface LinkedinResult {
    data: {
        data: {
            searchDashReusableClusteredTypeaheadByClustered: {
                elements: SearchResultElement[];
            }
        }
    }
}

const linkedinUserId: string = '';
const csrf: string = '';
const liAtCookie: string = "";
const jsessionIdCookie: string = "";
const queryId: string = "";

async function voyagerApiGraphQL(keywords: string) {
    let url: string = `https://www.linkedin.com/voyager/api/graphql`;

    const result: AxiosResponse<LinkedinResult, LinkedinResult> = await axios.get(url, {
        headers: {
            "Cookie": `li_at=${liAtCookie}; JSESSIONID=${jsessionIdCookie};`,
            "Csrf-Token": csrf,
            "Accept": "application/vnd.linkedin.normalized+json+2.1",
            "Referer": `https://www.linkedin.com/in/${linkedinUserId}/edit/forms/position/new/?profileFormEntryPoint=PROFILE_SECTION`,
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        },
        params: {
            variables: `(keywords:${keywords},clusters:List(SKILLS_ON_PROFILE,SKILLS_NOT_ON_PROFILE))`,
            queryId: `voyagerSearchDashReusableClusteredTypeahead.${queryId}`
        }
    });

    return result.data;
}

function generateCombinations(length: number): string[] {
    const chars: string = 'abcdefghijklmnopqrstuvwxyz01234567890';
    let combinations: string[] = [];

    function generate(current: string, depth: number) {
        if (depth === length) {
            combinations.push(current);
            return;
        }

        for (let i = 0; i < chars.length; i++) {
            generate(current + chars[i], depth + 1);
        }
    }

    generate('', 0);
    return combinations;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function writeToFile(content: string) {
    fs.appendFile('./result.txt', content + '\n')
}

async function runSearch() {
    const combinations: string[] = generateCombinations(3);
    console.log(`${combinations.length} Generated`);

    for (let combinaison of combinations) {
        console.log(`Searching for: ${combinaison}`);

        try {
            let result: LinkedinResult = await voyagerApiGraphQL(combinaison);

            const elements: SearchResultElement[] = result.data.data.searchDashReusableClusteredTypeaheadByClustered.elements;

            for (let element of elements) {
                const searchResultElements: ResultElement[] = element.results;

                for (let searchResultElement of searchResultElements) {
                    writeToFile(searchResultElement.title.text);
                }
            }

            //await delay(300);
        } catch (error: any) {
            console.log(error);
        }
    }
}

runSearch();
