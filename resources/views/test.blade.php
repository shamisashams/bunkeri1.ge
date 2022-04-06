
<form method="post" action="/ge/test/filter">
    @csrf
    <ul>
        @foreach($attrs as $item)

            <li>
                @if($item->type !== 'boolean')
                <label>
                    {{$item->name}}
                </label>

                <ul>
                    @foreach($item->options as $option)
                        <li>
                            <label>
                                {{$option->label}}
                                <input type="checkbox" name="filter[{{$item->code}}][]" value="{{$option->id}}">
                            </label>
                        </li>
                    @endforeach
                </ul>

                @else

                    <label>
                        {{$item->name}}
                        <input type="checkbox" name="filter[{{$item->code}}]" value="1">
                    </label>

                @endif

            </li>
        @endforeach
    </ul>
    <input type="submit">
</form>



