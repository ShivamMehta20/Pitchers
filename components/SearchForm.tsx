import React from 'react'
import Form from "next/form";
import {SearchFormReset} from "@/components/SearchFormReset";
import {Search} from "lucide-react";

export const SearchForm = ({query}:{query?:string}) => {
    return (

        <Form action='/' scroll={ false} className="search-form">
            <input type="text"
                   defaultValue={query}
                   className="search-input"
                   name="query"
                   placeholder="Search"/>
            <div className="flex gap-2">
                {query && <SearchFormReset/>}
                <button type="submit" className="search-btn text-white">
                        <Search className="size-5"/>
                </button>
            </div>
            </Form>
    )
}
