<?php

namespace App\Http\Traits;

use Illuminate\Http\Request;

trait Crud
{
    public function index($id = null)
    {
        if ($id) {
            return $this->repository->all($id);
        }
        return $this->repository->all();
    }

    public function show($id)
    {
        $data = $this->model::find($id);
        return $this->repository->show($data);
    }

    public function store(Request $request)
    {
        return $this->repository->store($request);
    }

    public function update(Request $request, $id)
    {
        $data = $this->model::find($id);
        return $this->repository->update($request, $data);
    }

    public function destroy($id)
    {
        $data = $this->model::find($id);
        return $this->repository->destroy($data);
    }
}
